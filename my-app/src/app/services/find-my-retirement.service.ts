import { Injectable } from '@angular/core';
import { SuitabilityService } from './suitability.service';
import { localCache } from '../utils/local_storage';
import { createPolicyConfidenceCurve, createWorkingGraph } from '../utils/graph_mapper';
import { friendlyMoney, createHistoricalLeverageRuns, createRunPerPeriod, createSummary, selectRepresentativeSample, createRecommendationsFromPertubations, SimulationResult } from '../utils/demon-utils';

import { of, Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { Pin, PinsService } from './pins.service';

export enum OptimizationObjective {
  Value,
  Time,
  Confidence,
}

interface ResultMetric {
  href: string;
  value: string;
  title: string;
  hint?: string;
}

/** View model/composition of retirement product
 *  "Find my retirement" explores value/time/confidence for a user
 */
@Injectable({
  providedIn: 'root'
})
export class FindMyRetirementService {

  leverage = .8;
  marketLeverage: c3.Data = { columns: [] };
  withdrawalConfidence: c3.Data = { columns: [] };
  summary: Subject<object> = new Subject();
  metrics: Subject<ResultMetric[]> = new Subject();
  simulations: Subject<number[][]> = new Subject();
  simulationStats: Subject<object> = new Subject();
  recommendations: Subject<object> = new Subject();
  working: Subject<c3.Data> = new Subject();
  retirement: Subject<c3.Data> = new Subject<c3.Data>();

  workingGridOptions: c3.GridOptions = {
    x: {
      lines: [
        { value: 250, text: '1 year' },
        { value: 750, text: '3 year' },
        { value: 1250, text: '5 years' },
        { value: 2500, text: '10 years' },
        { value: 3750, text: '15 years' },
        { value: 5000, text: '20 years' },
        { value: 7500, text: '30 years' },
      ]
    },
    y: {
      lines: [
        { value: .25, text: '25% to retirement' },
        { value: .5, text: '50% to retirement' },
        { value: .75, text: '75% to retirement' },
        { value: 1, text: 'Retirement achieved!' },
      ]
    }
  }

  retirementGridOptions: c3.GridOptions = {
    y: {
      lines: [
        { value: .95, text: '95% confidence' },
        { value: .85, text: '80% confidence' },
        { value: .5, text: '50% confidence' },
      ]
    }
  }


  withdrawalConfidenceGridOptions: c3.GridOptions = {
    y: {
      lines: [
        { value: .95, text: '95% confidence' },
        { value: .85, text: '80% confidence' },
        { value: .5, text: '50% confidence' },
      ]
    }
  }

  constructor(
    suitabilityService: SuitabilityService,
    private pinsService: PinsService,
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
    console.log('lev', val);
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
        x: 'x',
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
    numWorkingSimulations: 5,
    safetyThreshold: .1,
    targetThreshold: .4,
    reachThreshold: .6,
  }

  calculateTargetNestEgg() {
    return this.retirementPreferences.nestEgg;
  }

  updateWorkingGraph(simulations: number[][]) {
    const representativeSampleSimulations = selectRepresentativeSample(Math.min(this.retirementPreferences.numWorkingSimulations, 20),
      simulations
    );

    const threshold = {
      target: this.retirementPreferences.targetThreshold,
      safety: this.retirementPreferences.safetyThreshold,
      reach: this.retirementPreferences.reachThreshold,
    };

    this.summary.next(createSummary(
      threshold,
      this.retirementPreferences.timeToWorkInYears,
      this.calculateTargetNestEgg(),
      simulations));
    this.simulations.next(representativeSampleSimulations);
    this.simulationStats.next(representativeSampleSimulations.map((simulation, index) => {
      const result = simulation[simulation.length - 1];
      const start = simulation[0];
      const maxDrawdown = Math.min(...simulation.map((balance, i, arr) => {
        const maxDrawdownBeyond = (Math.min(...simulation.slice(i)) - balance) / balance;
        return maxDrawdownBeyond;
      }), 0);
      return {
        label: index === 0 ? 'min' :
          index === representativeSampleSimulations.length - 1 ? 'max' :
            index * 5,
        result: `${result}`.slice(0, 5), start, maxDrawdown: `${Math.round(maxDrawdown * 100)}%`
      };
    }));

    this.metrics.next([]);
    this.working.next({
      x: 'x',
      columns: [
        ['x',
          ...new Array(this.retirementPreferences.timeToWorkInYears * 250).fill(0).map((v, i) => i)],
        ...representativeSampleSimulations.map((simulation, i): [string, ...number[]] => ([`${i}`, ...simulation])).slice(1, -1)
      ],
    });

  }

  updateRetirementPreferences(obj) {
    try {
      const fromCache = localCache().getItem('retirementPreferences');
      this.retirementPreferences = fromCache && fromCache.length > 50 ? { ...this.retirementPreferences, ...JSON.parse(fromCache) } : this.retirementPreferences;
      this.retirementPreferences = { ...this.retirementPreferences, ...obj };
      localCache().setItem('retirementPreferences', JSON.stringify(this.retirementPreferences));
    } catch (e) {

    }
    this.retirementPreferences = { ...this.retirementPreferences, ...obj };

    console.log('preferences', this.retirementPreferences, JSON.stringify(this.retirementPreferences, null, 4))

    const params = [this.retirementPreferences.timeToWorkInYears,
    this.retirementPreferences.investingLeverage,
    this.retirementPreferences.annualAmountSavedAfterTax / this.calculateTargetNestEgg(),
    this.retirementPreferences.initialSavings / this.calculateTargetNestEgg(),

    ];

    const simulations = createRunPerPeriod(
      Math.round(params[0]), // time to work in years
      params[1],
      params[2],
      params[3],
      this.retirementPreferences.numWorkingSimulations,
      this.pinsService.allPins().filter(pin => pin.active).map(pin => ({ ...pin, amount: pin.amount / this.calculateTargetNestEgg() })),
    ).then(simulations => {
      this.updateWorkingGraph(simulations);
      return simulations;
    });

    const perturbedSimulations = this.generateRecommendations(
      this.retirementPreferences.timeToWorkInYears,
      this.retirementPreferences.investingLeverage,
      this.retirementPreferences.annualAmountSavedAfterTax / this.calculateTargetNestEgg(),
      this.retirementPreferences.initialSavings / this.calculateTargetNestEgg(),
      this.retirementPreferences.numWorkingSimulations,
      this.pinsService.allPins().filter(pin => pin.active).map(pin => ({ ...pin, amount: pin.amount / this.calculateTargetNestEgg() })),
    );

    Promise.all([simulations, perturbedSimulations]).then(([results, pertubations]) => {

      const threshold = {
        target: this.retirementPreferences.targetThreshold,
        safety: this.retirementPreferences.safetyThreshold,
        reach: this.retirementPreferences.reachThreshold,
      };
      return createRecommendationsFromPertubations(
        threshold,
        this.retirementPreferences.timeToWorkInYears,
        this.calculateTargetNestEgg(),
        { params, results },
        pertubations
      )
    }).then(recommendations => {
      console.log('recommendations', recommendations);
      this.recommendations.next(recommendations);
    });

    createPolicyConfidenceCurve(
      this.retirementPreferences.retirementInvestingLeverage,
      this.retirementPreferences.retirementTimeHorizonInYears).then(results => {
        this.retirement.next({
          x: 'x',
          columns: [
            ['x', ...results.map(result => result.withdrawal)],
            [`${this.retirementPreferences.retirementTimeHorizonInYears} years at ${this.retirementPreferences.retirementInvestingLeverage}`,
            ...results.map(result => result.confidence)],
          ]
        });
      });

  }

  /** To generate recommendations currently, let's perturb each of the preferences */
  generateRecommendations(
    timeToWorkInYears: number,
    leverageDaily: number,
    contribution: number = 0,
    initialBalance: number = 0,
    numSimulations: number,
    pins: Pin[],
  ): Promise<SimulationResult[]> {


    const perturbedParameters = [
      ...perturbSingleParameter(1.2, [timeToWorkInYears, leverageDaily, contribution, initialBalance]),
      ...perturbSingleParameter(.8, [timeToWorkInYears, leverageDaily, contribution, initialBalance]),
    ];
    const pertubationSimulations = perturbedParameters.map(params => {
      return createRunPerPeriod(
        Math.round(params[0]), // time to work in years
        params[1],
        params[2],
        params[3],
        numSimulations,
        pins,
      );
    });


    return Promise.all(pertubationSimulations).then((allPertubationResults) => {
      // zip the params with the result
      return allPertubationResults.map((results, i) => ({
        params: perturbedParameters[i], results
      }));
    });

    function perturbSingleParameter(pertubation: number, params: number[]) {
      return params.map((val, i, arr) => {
        const copy = [...arr];
        copy[i] = parseFloat((arr[i] * pertubation).toFixed(2));
        return copy;
      });
    }
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
