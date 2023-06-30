import { Component } from '@angular/core';

interface Savings {
  series: number[][];
  config: object;
}

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
    initialBalance: new FormControl(0),
    nominalMultiplier: new FormControl(1),
    savingsPerPeriod: new FormControl(.1),
    interestRate: new FormControl(.05),
    numPeriods: new FormControl(30),
    useMultiplier: new FormControl(true),
    stepNext: new FormControl(true),
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
    return {
      x: 'x',
      columns: [
        ['x', ...new Array(20).fill(0).map((v, i) => i)],
        ...columns.map((v, i) => {
          return [i, ...v];
        }),
      ],
    };
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
