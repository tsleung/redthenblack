import { Component } from '@angular/core';

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