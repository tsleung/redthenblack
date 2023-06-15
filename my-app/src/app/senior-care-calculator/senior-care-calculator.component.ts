import { Component } from '@angular/core';

@Component({
  selector: 'app-senior-care-calculator',
  templateUrl: './senior-care-calculator.component.html',
  styleUrls: ['./senior-care-calculator.component.scss']
})
export class SeniorCareCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';