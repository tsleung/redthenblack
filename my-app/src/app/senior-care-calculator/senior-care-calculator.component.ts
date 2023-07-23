import { Component } from '@angular/core';

/**
 * Can you write a web article that takes 10 minutes to read for an undergraduate which describes the quantitative approach to preparing for parents who need to get senior care in a retirement home using NPV and cash flow analysis while also describing all the discrete costs involved.
 */

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