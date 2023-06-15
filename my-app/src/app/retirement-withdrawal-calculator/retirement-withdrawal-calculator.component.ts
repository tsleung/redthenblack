import { Component } from '@angular/core';

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