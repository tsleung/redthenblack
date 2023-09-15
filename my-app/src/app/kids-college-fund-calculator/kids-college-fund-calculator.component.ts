import { Component } from '@angular/core';

/**
 * Can you write a web article that takes 10 minutes to read for an undergraduate which describes the quantitative approach to saving for a kid's college fund.
 */

@Component({
  selector: 'app-kids-college-fund-calculator',
  templateUrl: './kids-college-fund-calculator.component.html',
  styleUrls: ['./kids-college-fund-calculator.component.scss']
})
export class KidsCollegeFundCalculatorComponent {
  controls = {
    numPeriods: new FormControl(22),
    delayUntilSaving: new FormControl(2),
    initialInvestment: new FormControl(5e4),
    rateOfReturn: new FormControl(1.1),
    additionalSavings: new FormControl(1e4),
    additionalSavingsGrowth: new FormControl(1.05),
    costOfCollege: new FormControl(2e5),
    costOfCollegeInflation: new FormControl(1.08),
  }

  form = new FormGroup(this.controls);

  fund = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateCollegeFund();
    }),
    startWith(this.calculateCollegeFund()),
    publishReplay(),
    refCount(),
  );
  fundCharts = this.fund.pipe(map(fundCostDifference => {
    return this.createCharts(
      fundCostDifference.fund,
      fundCostDifference.cost,
      fundCostDifference.difference,
    );
  }))

  calculateCollegeFund() {
    return calculateCollegeFund(
      this.controls.numPeriods.value,
      this.controls.delayUntilSaving.value,
      this.controls.initialInvestment.value,
      this.controls.rateOfReturn.value,
      this.controls.additionalSavings.value,
      this.controls.additionalSavingsGrowth.value,
      this.controls.costOfCollege.value,
      this.controls.costOfCollegeInflation.value,
    );


  }

  createCharts(
    fund: number[],
    cost: number[],
    difference: number[],
  ) {
    const chartData = {
      x: 'x',
      columns: [
        ['x', ...new Array(fund.length).fill(0).map((v, i) => i)],
        ['College Fund', ...fund],
        ['Cost of College', ...cost],
        ['Difference', ...difference],
      ],
    };

    return chartData;
  }

  constructor() { }
}
import { FormControl, FormGroup } from '@angular/forms';
import { map, publishReplay, refCount, startWith } from 'rxjs/operators';

function calculateCollegeFund(
  numPeriods: number,
  delayUntilSaving: number,
  initialInvestment: number,
  rateOfReturn: number,
  additionalSavings: number,
  additionalSavingsGrowth: number,
  costOfCollege: number,
  costOfCollegeInflation: number,
) {

  // figure out the college fund
  const fund = new Array(numPeriods).fill(0).reduce((accum, v, i) => {
    const previousBalance = accum.at(-1);
    const savings = additionalSavings *
      Math.pow(additionalSavingsGrowth, i - delayUntilSaving);

    return delayUntilSaving < i ?
      // add savings
      [...accum ,nextStepSavings(
        previousBalance,
        rateOfReturn,
        savings
      )] :
      // no savings
      [...accum, previousBalance];

  }, [initialInvestment]);

  // figure out the cost of college
  const cost = new Array(numPeriods).fill(0).reduce((accum, v, i) => {
    const costOfCollege = accum.at(-1);
    const inflatedCostOfCollege = nextStepCollege(
      costOfCollege,
      costOfCollegeInflation
    );

    return [...accum, inflatedCostOfCollege]
  }, [costOfCollege]);


  const difference = fund.map((v, i) => {
    return fund[i] - cost[i];
  });

  return {
    fund,
    cost,
    difference,
  }

}

function nextStepSavings(
  currentInvestment: number,
  investmentReturn: number,
  additionalSavings: number,
) {
  return currentInvestment * investmentReturn + additionalSavings;

}
function nextStepCollege(
  costOfCollege: number,
  costOfCollegeInflation: number,
) {

  return costOfCollege * costOfCollegeInflation;
}