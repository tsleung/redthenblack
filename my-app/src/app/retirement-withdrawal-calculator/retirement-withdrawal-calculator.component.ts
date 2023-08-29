import { Component } from '@angular/core';

/**
 * Can you write a web article that takes 20 minutes to read for an undergraduate which describes the quantitative approach to evaluating withdrawal rate over a variable length retirement horizon. This should include the risks of inflation, equity risk, interest rates, having a home vs renting, and focus on the withdrawal rate of a nest egg subject to risk factors. Mention withdrawal rates either fixed or percentage, between 2% and 4% rule, and mention any generalized rule of thumb is a risky assumption given personal suitability of retirement horizons. Stress benefits of confidence intervals and monte carlo simulation methods for personal situations.
 */

@Component({
  selector: 'app-retirement-withdrawal-calculator',
  templateUrl: './retirement-withdrawal-calculator.component.html',
  styleUrls: ['./retirement-withdrawal-calculator.component.scss']
})
export class RetirementWithdrawalCalculatorComponent {
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

  calculateReturns() {
    const options = this.form.value;
    console.log('options', options)
    
    const columns = createColumns(options);
    console.log('columns', columns)
    const numPeriods = this.controls.numPeriods.value ?? 0; 
    const chartData = {
      x: 'x',
      columns: [
        ['x', ...new Array(numPeriods).fill(0).map((v, i) => i)],
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

function createColumns(options):number[][] {

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

import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';