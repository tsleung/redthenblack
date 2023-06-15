import { Component } from '@angular/core';

@Component({
  selector: 'app-paying-debt-calculator',
  templateUrl: './paying-debt-calculator.component.html',
  styleUrls: ['./paying-debt-calculator.component.scss']
})
export class PayingDebtCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';