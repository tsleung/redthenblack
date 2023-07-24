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
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';