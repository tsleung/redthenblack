import { Component } from '@angular/core';

/**
 * Can you write a web article that takes 10 minutes to read which describes the quantitative approach to evaluating the tradeoff of continuing a profession vs going back to school to pursue higher education? This should include to get an additional degree, like a masters or PhD, within the same field of education. I would like the article to instruct the reader to evaluate the outcomes of salary/income but also the idea of exploring new career paths and utility of fulfillment.
 */

/** Whether or not to go for a masters for higher pay, also utility of new degree */
@Component({
  selector: 'app-back-to-school-calculator',
  templateUrl: './back-to-school-calculator.component.html',
  styleUrls: ['./back-to-school-calculator.component.scss']
})
export class BackToSchoolCalculatorComponent {
  controls = {
    initialBalance: new FormControl<number>(1e6),
    nominalMultiplier: new FormControl(<number>1),
    savingsPerPeriod: new FormControl<number>(0),
    withdrawalRate: new FormControl<number>(.03),
    numPeriods: new FormControl<number>(30),
    useMultiplier: new FormControl<boolean>(true),
    stepNext: new FormControl<boolean>(true),
  }

  form = new FormGroup(this.controls);

  balance = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateReturns();
    }),
    startWith(this.calculateReturns())
  );

  /**
   * Calculate two alternative paths, one without school, one without
   * 
   * Merge those two together to create two different sets of expected cash flows
   *
   */
  calculateReturns() {
    const options = this.form.value;
    console.log('options', options)

    const columns = createColumns(options);
    console.log('columns', columns)
    const chartData = {
      x: 'x',
      columns: [
        ['x', ...new Array(20).fill(0).map((v, i) => i)],
        ...columns.map((v, i) => {
          return [i, ...v];
        }),
      ],
    };

    return {
      chartData,
    }
  }

  constructor() {

  }
}

function createColumns(options): number[][] {

  const savingsPlan = new Array(
    options.numPeriods).fill(options.savingsPerPeriod).reduce((allPeriods, savingsPerPeriod) => {
      const lastPeriod = allPeriods.at(-1);
      const withdrawalRate = 1 - options.withdrawalRate;
      return [
        ...allPeriods,
        calculateOnePeriod(lastPeriod, savingsPerPeriod, withdrawalRate),
      ];
    }, [options.initialBalance])

  return [
    savingsPlan.map(v => Number(v.toFixed(2))),
  ]
}


function calculateOnePeriod(
  lastPeriod: number,
  savingsPerPeriod: number,
  rateMultiplier: number,
) {

  // at the beginning of the period, add to savings
  // compound new return
  const newBalanceAfterSavings = lastPeriod + savingsPerPeriod;
  const newBalanceAfterSavingsAndInterest = newBalanceAfterSavings * (rateMultiplier);

  return newBalanceAfterSavingsAndInterest;
}

/**
 * determine number of periods
 * 
 * for each period, generate a value...
 * - based on the previous value
 * - based on a fundamental value (select from a deck)
 * - based on an arbitrary override (can be user selected)
 * 
 * absolute, arithmetic (additive/multiplicative), with trend/fundamental dependency
 */
function cashFlowGen() {
  console.log('cash flow gens')
  // Builder pattern? how to express
  
  interface Series {}
  const series = {};
  function ConstantSeries() { return series;}
  function GeometricSeries() { return series;}
  function AdditiveSeries() { return series;}
  
}




(cashFlowGen)()

import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';