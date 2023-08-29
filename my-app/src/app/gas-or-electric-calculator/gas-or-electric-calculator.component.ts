import { Component } from '@angular/core';


/**
 Can you write a web article that takes 20 minutes to read for a college educated adult which describes the quantitative approach utilizing discounted cash flow analysis and NPV to evaluating the tradeoff between a gas vs electric car? The article should consider the financial costs of the two different vehicles, resale values, impact to the environment, and exposure to risks in inflation, energy prices, weather, and other factors. 
 
 
Gas Car
Initial purchase price: $25,000
Fuel costs: $2,000 per year
Maintenance costs: $1,000 per year
Resale value: $15,000 after 5 years

EV
Initial purchase price: $35,000
Fuel costs: $500 per year
Maintenance costs: $1,000 per year
Resale value: $20,000 after 5 years
 */

// make sure to take care of the utility benefits of using electric instead of gas

@Component({
  selector: 'app-gas-or-electric-calculator',
  templateUrl: './gas-or-electric-calculator.component.html',
  styleUrls: ['./gas-or-electric-calculator.component.scss']
})
export class GasOrElectricCalculatorComponent {
  controls = {
    numPeriods: new FormControl(5),
    
    gasCarCost: new FormControl(2.5e4),
    gasFuelCost: new FormControl(2e3),
    gasMaintenanceCost: new FormControl(1e3),
    gasResaleValue: new FormControl(1.5e4),
    
    electricCarCost: new FormControl(3.5e4),
    electricFuelCost: new FormControl(.5e3),
    electricMaintenanceCost: new FormControl(1e3),
    electricResaleValue: new FormControl(2e4),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';