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
      console.log('annualized returns', returns);
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

  simulateVariance = new Subject<boolean>();
  allYearsDifferenceWithVariationResults = combineLatest([
    this.form.valueChanges.pipe(startWith(true)),
    this.simulateVariance.pipe(startWith(0)), 
  ]).pipe(
    map(() => {
      console.log('generating new sample')
      return this.calculateAllYearsDifferenceWithVariation();  
    }),
    publishReplay(),
    refCount(),
  );

  clear = new BehaviorSubject(true);
  allYearsDifferenceWithVariationAggregated = this.allYearsDifferenceWithVariationResults.pipe(
  scan((all,results) => {
    return [results, ...all];
  }, []),
  );

  allYearsDifferenceWithVariation = this.allYearsDifferenceWithVariationResults.pipe(
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
  )

  calculateAllYearsDifferenceWithVariation() {
    const monthlyReturns = convertCommaStrToNumArr(this.controls.monthlyReturns.value);
    const numYears = this.controls.numYears.value;
    const annualInvestment = this.controls.annualInvestment.value;

    return allYearsSamplingDifference(monthlyReturns, numYears, annualInvestment);
  }
  
  constructor() { }
}

import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest,merge, Subject, Observable } from 'rxjs';
import { map, filter, startWith,publishReplay, refCount,scan } from 'rxjs/operators';
import { allYearsDifference, allYearsSamplingDifference, firstYearDifference } from './utils';

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