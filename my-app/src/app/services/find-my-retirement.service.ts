import { Injectable } from '@angular/core';
import { SuitabilityService } from './suitability.service';
import {localCache,friendlyMoney,createHistoricalLeverageRuns,createPolicyConfidenceCurve,createWorkingGraph, createRunPerPeriod} from '../utils/demon-utils';
import {findMyRetirement, promptString, promptNumber} from '../utils/find-my-retirement';

import { of,Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

export enum OptimizationObjective {
  Value,
  Time,
  Confidence,
}


/** View model/composition of retirement product
 *  "Find my retirement" explores value/time/confidence for a user
 */
@Injectable({
  providedIn: 'root'
})
export class FindMyRetirementService {
  
  leverage = .8;
  marketLeverage:c3.Data = {columns:[]};
  withdrawalConfidence:c3.Data = {columns:[]};
  summary:Subject<object> = new Subject();
  working:Subject<c3.Data> = new Subject();
  retirement:Subject<c3.Data> = new Subject<c3.Data>();

  workingGridOptions:c3.GridOptions = {
    x: {
      lines: [
        {value: 250, text: '1 year'},
        {value: 750, text: '3 year'},
        {value: 1250, text: '5 years'},
        {value: 2500, text: '10 years'},
        {value: 3750, text: '15 years'},
        {value: 5000, text: '20 years'},
        {value: 7500, text: '30 years'},
      ]
    },
    y: {
      lines: [
          {value: .25, text: '25% to retirement'},
          {value: .5, text: '50% to retirement'},
          {value: .75, text: '75% to retirement'},
          {value: 1, text: 'Retirement achieved!'},
      ]
    }
  }
  
  retirementGridOptions:c3.GridOptions = {
    y: {
      lines: [
          {value: .95, text: '95% confidence'},
          {value: .85, text: '80% confidence'},
          {value: .5, text: '50% confidence'},
      ]
    }
  }


withdrawalConfidenceGridOptions:c3.GridOptions = {
  y: {
    lines: [
        {value: .95, text: '95% confidence'},
        {value: .85, text: '80% confidence'},
        {value: .5, text: '50% confidence'},
    ]
  }
}

  constructor(
    suitabilityService : SuitabilityService
  ) {
    this.updateMarketLeverage();
    this.createPolicyConfidenceCurve();
    this.updateRetirementPreferences({});
  }

  editLeverage() {
    const val = Number(window.prompt("Leverage", `${this.leverage}`)) ?? this.leverage;
    this.updateLeverage(val);
  }
  updateLeverage(val) {
    console.log('lev',val);
    this.leverage = val;
    this.updateMarketLeverage();
    this.createPolicyConfidenceCurve();
  
  }

  updateMarketLeverage() {
    createHistoricalLeverageRuns(this.leverage).then(data => {
      this.marketLeverage = data;
    });
  }

  createPolicyConfidenceCurve() {
    Promise.all([
      createPolicyConfidenceCurve(this.leverage, 30),
      createPolicyConfidenceCurve(this.leverage, 45),
      createPolicyConfidenceCurve(this.leverage, 60),
    ]).then(([short, medium, long]) => {
      console.log('mediumm retirement', medium);
      this.withdrawalConfidence = {
        x:'x',
        columns: [
          ['x', ...short.map(result => result.withdrawal)],
          ['30 years', ...short.map(result => result.confidence)],
          ['45 years', ...medium.map(result => result.confidence)],
          ['60 years', ...long.map(result => result.confidence)],
        ]
      }
    });
  }

  toFriendlyName(str) {
    return str;
    
  }
  // personal config
  retirementPreferences = {
    annualAfterTaxIncome: 200000,
    annualAmountSavedAfterTax: 50000,
    timeToWorkInYears: 5,
    initialSavings: 250000,
    annualRetirementIncome: 150000,
    nestEgg: 1000000,
    investingLeverage: 1.8,
    retirementInvestingLeverage: 0.8,
    retirementTimeHorizonInYears: 30,
    probabilityOfSuccess: .95,
    approximateCapitalGainsTax: .15,
    numWorkingSimulations : 5,
  }
  
  workingMessage = '';

  calculateTargetNestEgg() {
    return this.retirementPreferences.nestEgg;
  }


  updateWorkingGraph(simulations) {
    
      // working results
      const successfulRuns = simulations.filter(simulation => {
        return simulation.slice(-1)[0] > 1;
      }).length;

      const medianOutcome = simulations[Math.floor(simulations.length / 2)].slice(-1)[0];
      const successRate = successfulRuns / simulations.length;
      this.workingMessage = `${successfulRuns} of ${simulations.length} simulations reach nest egg goal of ${this.calculateTargetNestEgg()}, ${successRate*100}% success. The median outcome made it ${Math.round(medianOutcome * 100)}% to retirement.`;

      this.summary.next({
        successfulRuns,
        nestEgg: friendlyMoney(this.calculateTargetNestEgg(),1),
        successRate,
        medianOutcome: `${friendlyMoney(Math.round(medianOutcome* this.calculateTargetNestEgg()),1)}`,
        time: `${this.retirementPreferences.timeToWorkInYears}y`,
        confidence: `${Math.round(successRate * 100)}%`,
        value: friendlyMoney(this.calculateTargetNestEgg(),1),
      })
      this.working.next({
        x: 'x',
        columns: [
          ['x',...new Array(this.retirementPreferences.timeToWorkInYears*250).fill(0).map((v,i) => i)],
          ...simulations.map((simulation,i):[string, ...number[]] => ([`${i}`, ...simulation]))
        ],
      });
      console.log('woring graph updated')
   
  }

  updateRetirementPreferences(obj) {
    try {
      const fromCache = localCache().getItem('retirementPreferences');
      console.log('from cache',fromCache)
      this.retirementPreferences = fromCache && fromCache.length > 50 ? JSON.parse(fromCache) : this.retirementPreferences;
      this.retirementPreferences = {...this.retirementPreferences,...obj};
      localCache().setItem('retirementPreferences', JSON.stringify(this.retirementPreferences));
    }catch(e) {

    }
    this.retirementPreferences = {...this.retirementPreferences,...obj};
    
    console.log('preferences',this.retirementPreferences)
    
    const allSimulations = [];

    /*
    createWorkingGraph(
      this.retirementPreferences.timeToWorkInYears,
      this.retirementPreferences.investingLeverage,
      this.retirementPreferences.annualAmountSavedAfterTax / this.calculateTargetNestEgg(),
      this.retirementPreferences.initialSavings / this.calculateTargetNestEgg(), 
      this.retirementPreferences.numWorkingSimulations,
    ).then(simulations => {
      this.updateWorkingGraph(simulations);
    });
    */
   createRunPerPeriod(
    this.retirementPreferences.timeToWorkInYears,
    this.retirementPreferences.investingLeverage,
    this.retirementPreferences.annualAmountSavedAfterTax / this.calculateTargetNestEgg(),
    this.retirementPreferences.initialSavings / this.calculateTargetNestEgg(),
    this.retirementPreferences.numWorkingSimulations,
    ).then(simulations => {
      this.updateWorkingGraph(simulations);
    });
    
    createPolicyConfidenceCurve(
      this.retirementPreferences.retirementInvestingLeverage, 
      this.retirementPreferences.retirementTimeHorizonInYears).then(results =>{
        this.retirement.next({x: 'x',
        columns : [
          ['x', ...results.map(result => result.withdrawal)],
          [`${this.retirementPreferences.retirementTimeHorizonInYears} years at ${this.retirementPreferences.retirementInvestingLeverage}`, 
          ...results.map(result => result.confidence)],
        ]});
      });
  }

  findMyRetirement() {
    this.updateAnnualRetirementIncome();
  }

  updateAnnualRetirementIncome() {
    this.retirementPreferences.annualRetirementIncome = 
      (this.retirementPreferences.annualAfterTaxIncome - 
      this.retirementPreferences.annualAmountSavedAfterTax);
      // include taxes later
      // / (1-this.retirementPreferences.approximateCapitalGainsTax);
  }
}

// math to a million
// timebox
