import { Component } from '@angular/core';

/**
 * Savings calculator
 * 
 * Demonstrate how much savings after number of periods
 * 
 * 
 * 
 */
@Component({
  selector: 'app-savings-calculator',
  templateUrl: './savings-calculator.component.html',
  styleUrls: ['./savings-calculator.component.scss']
})
export class SavingsCalculatorComponent {
  controls = {
    initialSavings: new FormControl(0),
    nominalMultiplier: new FormControl(1),
    savingsPerPeriod: new FormControl(.5),
    interestRate: new FormControl(.05),
    numPeriods: new FormControl(30),
    useMultiplier: new FormControl(true),
    stepNext: new FormControl(true),
  }

  form = new FormGroup(this.controls);

  savings = this.form.valueChanges.pipe(
    map(values => {
      console.log('values', values)
      return this.calculateSavings(values);
    }),
    startWith(this.calculateSavings(this.form.value))
  );

  calculateSavings(values) {
    return this.form.value;
  }

  constructor() {


  }

}
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs';
