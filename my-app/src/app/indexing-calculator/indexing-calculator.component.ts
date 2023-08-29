import { Component } from '@angular/core';


/**
 * Can you write a web article that takes 20 minutes to read for an undergraduate which describes the quantitative approach to evaluating index investing over variable length retirement horizon. This should include the risks of inflation, equity risk premium, interest rates, sharpe ratio, volatility, rebalancing, and optimal bet sizing. Mention any generalized rule of thumb is a risky assumption given personal suitability of retirement horizons. Stress benefits of confidence intervals and monte carlo simulation methods for personal situations.
 */

@Component({
  selector: 'app-indexing-calculator',
  templateUrl: './indexing-calculator.component.html',
  styleUrls: ['./indexing-calculator.component.scss']
})
export class IndexingCalculatorComponent {
  controls = {
    initialBalance: new FormControl<number>(1e4),
    nominalMultiplier: new FormControl(<number>1),
    savingsPerPeriod: new FormControl<number>(0),
    expectedReturn: new FormControl<number>(.07),
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

  calculateReturns() {
    const options = this.form.value;
    console.log('options', options)
    
    const columns = createColumns(options);
    console.log('columns', columns)
    const numColumns = this.controls.numPeriods.value ?? 0; 
    const chartData = {
      x: 'x',
      columns: [
        ['x', ...new Array(numColumns).fill(0).map((v, i) => i)],
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

function createColumns(options) {

  const savingsPlan = new Array(
    options.numPeriods).fill(options.savingsPerPeriod).reduce((allPeriods, savingsPerPeriod) => {
      const lastPeriod = allPeriods.at(-1);
      const interestRate = options.expectedReturn;
  return [
      ...allPeriods,
      calculateOnePeriod(lastPeriod, savingsPerPeriod, interestRate),
    ];
  }, [options.initialBalance])

  return [
    savingsPlan.map(v => Number(v.toFixed(2))),
  ]
}


function calculateOnePeriod(
  lastPeriod: number,
  savingsPerPeriod: number,
  interestRate: number,
) {

  // at the beginning of the period, add to savings
  // compound new return
  const newBalanceAfterSavings = lastPeriod + savingsPerPeriod;
  const newBalanceAfterSavingsAndInterest = newBalanceAfterSavings * (1+interestRate);
  return newBalanceAfterSavingsAndInterest;
}

import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';