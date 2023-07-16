import { Component } from '@angular/core';


/**
 Can you write a web article that takes 20 minutes to read for a college educated adult which describes the quantitative approach utilizing discounted cash flow analysis and NPV to evaluating the tradeoff between a gas vs electric car? The article should consider the financial costs of the two different vehicles, resale values, impact to the environment, and exposure to risks in inflation, energy prices, weather, and other factors. 
 */

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