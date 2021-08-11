import { Component, OnInit } from '@angular/core';
import {createHistoricalLeverageRuns,createPolicyConfidenceCurve, createWorkingGraph} from '../utils/demon-utils';
import {findMyRetirement, promptString, promptNumber} from '../utils/find-my-retirement';


@Component({
  selector: 'app-demon',
  templateUrl: './demon.component.html',
  styleUrls: ['./demon.component.scss']
})
export class DemonComponent implements OnInit {
  
leverage = .8;
marketLeverage:c3.Data = {columns:[
  // ['data1', 30, 200, 100, 400, 150, 250],
  // ['data2', 50, 20, 10, 40, 15, 25],
  // ['data3', .50, .20, .10, .40, .15, .25]
]};
withdrawalConfidence:c3.Data = {columns:[
  // ['data1', 30, 200, 100, 400, 150, 250],
  // ['data2', 50, 20, 10, 40, 15, 25],
  // ['data3', .50, .20, .10, .40, .15, .25]
]};

working:c3.Data = {columns:[
  // ['data1', 30, 200, 100, 400, 150, 250],
  // ['data2', 50, 20, 10, 40, 15, 25],
  // ['data3', .50, .20, .10, .40, .15, .25]
]};

retirement:c3.Data = {columns:[
  // ['data1', 30, 200, 100, 400, 150, 250],
  // ['data2', 50, 20, 10, 40, 15, 25],
  // ['data3', .50, .20, .10, .40, .15, .25]
]};

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

  constructor() {
    this.updateMarketLeverage();
    this.createPolicyConfidenceCurve();
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

  updateWithdrawalConfidence() {

  }

  ngOnInit(): void {
  }

  numUpdates = 0;
  // personal config
  retirementPreferences = {
    annualAfterTaxIncome: 200000,
    annualAmountSavedAfterTax: 50000,
    timeToWorkInYears: 5,
    initialSavings: 350000,
    withdrawalRate: .02,
    annualRetirementIncome: 150000,
    investingLeverage: 1.6,
    retirementInvestingLeverage: 0.8,
    retirementTimeHorizonInYears: 30,
    probabilityOfSuccess: .95,
    approximateCapitalGainsTax: .15,
  }
  numWorkingSimulations = 5;
  workingMessage = '';

  calculateTargetNestEgg() {
    return this.retirementPreferences.annualRetirementIncome / this.retirementPreferences.withdrawalRate;
  }

  promptNumWorkingSimulations() {
    this.numWorkingSimulations = promptNumber("Number of working simulations", this.numWorkingSimulations);
    this.updateRetirementPreferences({});
  }

  updateRetirementPreferences(obj) {
    this.retirementPreferences = {...this.retirementPreferences,...obj};
    this.numUpdates++;

    if(this.numUpdates >=2 ){
      createWorkingGraph(
        this.retirementPreferences.timeToWorkInYears,
        this.retirementPreferences.investingLeverage,
        this.retirementPreferences.annualRetirementIncome / this.calculateTargetNestEgg(),
        this.retirementPreferences.initialSavings / this.calculateTargetNestEgg(), 
        this.numWorkingSimulations,
      ).then(simulations => {

        // working results
        const successfulRuns = simulations.filter(simulation => {
          return simulation.slice(-1)[0] > 1;
        }).length;

        const medianOutcome = simulations[Math.floor(simulations.length / 2)].slice(-1)[0];
        const successRate = successfulRuns / simulations.length;
        this.workingMessage = `${successfulRuns} of ${simulations.length} simulations reach nest egg goal of ${this.calculateTargetNestEgg()}, ${successRate*100}% success. The median outcome made it ${Math.round(medianOutcome * 100)}% to retirement.`;
        this.working = {
          // sort and modulo to reduce
          x:'x',
          columns: 
          [
            ['x',...new Array(this.retirementPreferences.timeToWorkInYears*250).fill(0).map((v,i) => i)],
            ...simulations.map((simulation,i):[string, ...number[]] => ([`${i}`, ...simulation]))
          ]
        };

      });

      
      createPolicyConfidenceCurve(
        this.retirementPreferences.retirementInvestingLeverage, 
        this.retirementPreferences.retirementTimeHorizonInYears).then(results =>{
          this.retirement = {
            x:'x',
            columns: [
              ['x', ...results.map(result => result.withdrawal)],
              [`${this.retirementPreferences.retirementTimeHorizonInYears} years at ${this.retirementPreferences.retirementInvestingLeverage}`, 
              ...results.map(result => result.confidence)],
            ]
          };
        });
    }
  }

  findMyRetirement() {
    this.promptAfterTaxIncome();
    this.promptAmountSavedAfterTax();
    this.updateAnnualRetirementIncome();
  }

  updateAnnualRetirementIncome() {
    this.retirementPreferences.annualRetirementIncome = 
      (this.retirementPreferences.annualAfterTaxIncome - 
      this.retirementPreferences.annualAmountSavedAfterTax);
      // include taxes later
      // / (1-this.retirementPreferences.approximateCapitalGainsTax);
  }
  // solicits
  
  
  promptWithdrawalRate() {
    this.updateRetirementPreferences(
      {withdrawalRate: promptNumber('Constant withdrawal rate',
      this.retirementPreferences.withdrawalRate)}
    );
  }

  promptAfterTaxIncome() {
    this.updateRetirementPreferences(
      {annualAfterTaxIncome: promptNumber('Annual after tax income',
      this.retirementPreferences.annualAfterTaxIncome)}
    );
  }

  promptAmountSavedAfterTax() {
    this.updateRetirementPreferences(
      {annualAmountSavedAfterTax: 
        Math.max(0,Math.min(this.retirementPreferences.annualAfterTaxIncome, promptNumber('Amount saved after tax', this.retirementPreferences.annualAmountSavedAfterTax)))
      }
    );
  }

  promptRetirementIncome() {
    this.updateRetirementPreferences(
      {annualRetirementIncome: promptNumber('Annual after tax income in retirement',
      this.retirementPreferences.annualRetirementIncome)}
    );
  }

  promptRetirementInvestingLeverage() {
    this.updateRetirementPreferences(
      {retirementInvestingLeverage: promptNumber('Stock market leverage in retirement',
      this.retirementPreferences.retirementInvestingLeverage)}
    );
  }

  promptTimeToWorkInYears() {
    this.updateRetirementPreferences(
      {timeToWorkInYears: promptNumber('Years spent working',
      this.retirementPreferences.timeToWorkInYears)}
    );
  }

  promptInvestingLeverage() {
    this.updateRetirementPreferences(
      {investingLeverage: promptNumber('Stock market leverage',
      this.retirementPreferences.investingLeverage)}
    );
  }

  promptTimeHorizon() {
    this.updateRetirementPreferences(
      {retirementTimeHorizonInYears: promptNumber('How many years in retirement',
      this.retirementPreferences.retirementTimeHorizonInYears)}
    );
  }

  promptInitialSavings() {
    this.updateRetirementPreferences(
      {initialSavings: promptNumber('Initial savings',
      this.retirementPreferences.initialSavings)}
    );
  }

  promptProbabilityOfSuccess() {
    this.updateRetirementPreferences(
      {probabilityOfSuccess: promptNumber('Probability of success',
      this.retirementPreferences.probabilityOfSuccess)}
    );
  }

  promptCapitalGains() {
    this.updateRetirementPreferences(
      {approximateCapitalGainsTax: promptNumber('Approximate capital gains tax',
      this.retirementPreferences.approximateCapitalGainsTax)}
    );
    this.updateAnnualRetirementIncome()
  }



}

/**
 * 

Collect initial inputs
After tax income
Savings

Calculate retirement model
=> Calculate retirement income
=> Calculate retirement model 
=> Calculate nest egg from retirement model
=> Calculate matrix of withdrawal rate and confidence for different retirement timelines
Solicit Retirement Income
Solicit Leverage
Solicit Time Horizon

Create forward model
=> Calculate how long it takes to grow savings + saving rate + growth to nest egg
Solicit initial savings
Solicit Leverage

 * 
 * 
 */
