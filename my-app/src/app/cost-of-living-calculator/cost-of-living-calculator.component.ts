import { Component } from '@angular/core';

/**
 * Cost of living should include inflation data, and variation of increase for different goods and services based on expenses 
 */
@Component({
  selector: 'app-cost-of-living-calculator',
  templateUrl: './cost-of-living-calculator.component.html',
  styleUrls: ['./cost-of-living-calculator.component.scss']
})
export class CostOfLivingCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';