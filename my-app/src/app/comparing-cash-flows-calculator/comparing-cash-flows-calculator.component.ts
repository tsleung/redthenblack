import { Component } from '@angular/core';

/**
 * Can you write a web article that takes 10 minutes to read which describes the quantitative approach to comparing two cash flows, including factors such as discount rate, for cash flows which are finite or in perpetuity?
 */

@Component({
  selector: 'app-comparing-cash-flows-calculator',
  templateUrl: './comparing-cash-flows-calculator.component.html',
  styleUrls: ['./comparing-cash-flows-calculator.component.scss']
})
export class ComparingCashFlowsCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';