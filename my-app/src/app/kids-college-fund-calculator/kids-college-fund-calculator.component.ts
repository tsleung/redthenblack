import { Component } from '@angular/core';

@Component({
  selector: 'app-kids-college-fund-calculator',
  templateUrl: './kids-college-fund-calculator.component.html',
  styleUrls: ['./kids-college-fund-calculator.component.scss']
})
export class KidsCollegeFundCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';