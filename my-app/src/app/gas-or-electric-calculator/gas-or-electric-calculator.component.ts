import { Component } from '@angular/core';


// make sure to take care of the utility benefits of using electric instead of gas

@Component({
  selector: 'app-gas-or-electric-calculator',
  templateUrl: './gas-or-electric-calculator.component.html',
  styleUrls: ['./gas-or-electric-calculator.component.scss']
})
export class GasOrElectricCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';