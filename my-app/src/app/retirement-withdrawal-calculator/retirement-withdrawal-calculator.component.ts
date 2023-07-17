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
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';