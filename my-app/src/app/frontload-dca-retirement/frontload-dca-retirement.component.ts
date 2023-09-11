import { Component } from '@angular/core';

const DEFAULT_ANNUAL_RATE = 1.1;
const DEFAULT_MONTHLY_RATE = Math.pow(DEFAULT_ANNUAL_RATE, 1 / 12).toFixed(6);
const DEFAULT_VERY_VOLATILE_RATE = ` 0.85, 1.1953`;
const DEFAULT_VOLATILE_RATE = `0.87, 1.16783`;
@Component({
  selector: 'app-frontload-dca-retirement',
  templateUrl: './frontload-dca-retirement.component.html',
  styleUrls: ['./frontload-dca-retirement.component.scss']
})
export class FrontloadDcaRetirementComponent {
  
  controls = {
    annualInvestment: new FormControl(20000),
    numYears: new FormControl(45),
    monthlyReturns: new FormControl(DEFAULT_VOLATILE_RATE),
  }

  form = new FormGroup(this.controls);
  

  toVeryVolatileRate() {
    this.controls.monthlyReturns.setValue(DEFAULT_VERY_VOLATILE_RATE);
  }
  toVolatileRate() {
    this.controls.monthlyReturns.setValue(DEFAULT_VOLATILE_RATE);
  }
  toSimpleRate() {
    this.controls.monthlyReturns.setValue(`${DEFAULT_MONTHLY_RATE}`);
  }
  monthlyReturns: Observable<number[]> = this.controls.monthlyReturns.valueChanges.pipe(
    startWith(DEFAULT_VOLATILE_RATE),
    // convert the string to an array of primitives
    map(val => {
      return convertCommaStrToNumArr(val);
    }),

  );

  annualizedReturns = this.monthlyReturns.pipe(
    map(returns => {
      return returns.reduce((returns, ret) => returns * ret, 1);
    }),
    filter(val => !isNaN(val))
  );

  firstYearDifference = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateFirstYearDifference();  
    }),
    startWith(this.calculateFirstYearDifference()),
    map(results => {
      return {
        ...results, 
        charts: this.createCharts(
          results.frontload,
          results.dca,
          results.difference,
        )
      };
    })
  );

  calculateFirstYearDifference() {
    const monthlyReturns = convertCommaStrToNumArr(this.controls.monthlyReturns.value);
    const numYears = this.controls.numYears.value;
    const annualInvestment = this.controls.annualInvestment.value;

    return firstYearDifference(monthlyReturns, numYears, annualInvestment);
  }


  allYearsDifference = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateAllYearsDifference();  
    }),
    startWith(this.calculateAllYearsDifference()),
    map(results => {
      return {
        ...results, 
        charts: this.createCharts(
          results.frontload,
          results.dca,
          results.difference,
        )
      };
    })
  );

  calculateAllYearsDifference() {
    const monthlyReturns = convertCommaStrToNumArr(this.controls.monthlyReturns.value);
    const numYears = this.controls.numYears.value;
    const annualInvestment = this.controls.annualInvestment.value;

    return allYearsDifference(monthlyReturns, numYears, annualInvestment);
  }

  createCharts(
    frontload: number[],
    dca: number[],
    difference: number[],
  ) {
    const chartData = {
      x: 'x',
      columns: [
        ['x', ...new Array(frontload.length).fill(0).map((v, i) => i)],
        ['Frontload', ...frontload],
        ['DCA', ...dca],
        ['Difference', ...difference],
      ],
    };

    return chartData;
  }
  constructor() { }
}


import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, filter, startWith } from 'rxjs/operators';


function firstYearDifference(monthlyReturns: number[], numYears: number, annualInvestment: number) {
  if(monthlyReturns.length != 12) {
    throw new Error(`Monthly returns needs to be have 12 values ${JSON.stringify(monthlyReturns)}`);
  }
  
  const numMonths = numYears * 12;
  // create standard monthly periods to compare evenly, right now not sampling
  const monthlyPeriods = new Array(numMonths).fill(0).map((v,i) => {
    const monthIndex = i % 12;
    return monthlyReturns[monthIndex];
  });

  const frontload = [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
    const balance = pastBalances.at(-1) * monthlyReturn;
    // check if its the beginning of the year
    return i % 12 === 0 && i < 12 ? 
      // add frontload
      [...pastBalances, balance + annualInvestment] :
      // Otherwise add nothing
      [...pastBalances, balance];
  }, [0]);

  const dca = [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
    const balance = pastBalances.at(-1) * monthlyReturn;
    return i < 12 ? 
      // DCA the first year
      [...pastBalances, balance + (annualInvestment / 12)] :
      // Past first year
      [...pastBalances, balance];
  }, [0]);

  // zip arrays and diff
  const difference = frontload.map((v,i) => {
    return frontload[i] - dca[i];
  });

  return {
    frontload,
    dca,
    difference
  };
}


function allYearsDifference(monthlyReturns: number[], numYears: number, annualInvestment: number) {
  if(monthlyReturns.length != 12) {
    throw new Error(`Monthly returns needs to be have 12 values ${JSON.stringify(monthlyReturns)}`);
  }
  
  const numMonths = numYears * 12;
  // create standard monthly periods to compare evenly, right now not sampling
  const monthlyPeriods = new Array(numMonths).fill(0).map((v,i) => {
    const monthIndex = i % 12;
    return monthlyReturns[monthIndex];
  });

  const frontload = [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
    const balance = pastBalances.at(-1) * monthlyReturn;
    // check if its the beginning of the year
    return i % 12 === 0 ? 
      // add frontload
      [...pastBalances, balance + annualInvestment] :
      // Otherwise add nothing
      [...pastBalances, balance];
  }, [0]);

  const dca = [...monthlyPeriods].reduce((pastBalances, monthlyReturn, i) => {
    const balance = pastBalances.at(-1) * monthlyReturn;
    // DCA all years
    return [...pastBalances, balance + (annualInvestment / 12)];
  }, [0]);

  // zip arrays and diff
  const difference = frontload.map((v,i) => {
    return frontload[i] - dca[i];
  });

  return {
    frontload,
    dca,
    difference
  };
}


function convertCommaStrToNumArr(val: string) {
  const arr = val.split(',');
  const defaultRate = Math.pow(1.1, 1 / 12);
  // if there is more than one value use it, 
  const numArr =  arr.length > 1 ?
    arr.map(val => Number(val) ?? defaultRate) :
    [Number(val) ?? defaultRate];

  return new Array(12).fill(0)
    // create 12 copies of the array, so even with 1 value, we have at least 12 months
    .map(() => numArr)
    // flatten all arrays into one
    .flat()
    // take the first 12 values
    .slice(0, 12);
}