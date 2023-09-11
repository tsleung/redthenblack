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
    numPeriods: new FormControl(30),
    delayUntilSaving: new FormControl(0),
    initialInvestment: new FormControl(1e4),
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
    startWith(this.calculateCollegeFund())
  );

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
  
  constructor() {}
}
import { FormControl, FormGroup } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

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


}

function nextStepSavings(
  currentInvestment: number,
  investmentReturn: number,
  additionalSavings: number,
  ) {
    return currentInvestment* investmentReturn + additionalSavings;

}
function nextStepCollege(
  costOfCollege: number,
  costOfCollegeInflation: number,
) {

  return costOfCollege*costOfCollegeInflation;
}