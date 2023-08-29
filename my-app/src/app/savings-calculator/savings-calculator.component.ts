import { Component } from '@angular/core';

/**
 * Savings calculator
 * 
 * Demonstrate how much savings after number of periods
 * 
 * 
 * 
 */
@Component({
  selector: 'app-savings-calculator',
  templateUrl: './savings-calculator.component.html',
  styleUrls: ['./savings-calculator.component.scss']
})
export class SavingsCalculatorComponent {
  controls = {
    initialBalance: new FormControl<number>(1e4),
    nominalMultiplier: new FormControl(<number>1),
    savingsPerPeriod: new FormControl<number>(1e3),
    interestRate: new FormControl<number>(.05),
    numPeriods: new FormControl<number>(30),
    useMultiplier: new FormControl<boolean>(true),
    stepNext: new FormControl<boolean>(true),
  }

  form = new FormGroup(this.controls);

  savings = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateSavings();
    }),
    startWith(this.calculateSavings())
  );

  calculateSavings() {
    const options = this.form.value;
    console.log('options', options)
    
    const columns = createSavingsColumns(options);
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


/** take initial savings and add to it */
function addToSavings() {
  // no trading cost

  // no fees
}

/** Apply interest rate to balance */
function addInterest() { // apply interest, apply rate?
  // no trading cost

  // no fees
}

function calculateOneSavingsPeriod(
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


function createSavingsColumns(options) {

  const savingsPlan = new Array(
    options.numPeriods).fill(options.savingsPerPeriod).reduce((allPeriods, savingsPerPeriod) => {
      const lastPeriod = allPeriods.at(-1);
      const interestRate = options.interestRate;
  return [
      ...allPeriods,
      calculateOneSavingsPeriod(lastPeriod, savingsPerPeriod, interestRate),
    ];
  }, [options.initialBalance])

  return [
    savingsPlan,
  ]
}

import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
