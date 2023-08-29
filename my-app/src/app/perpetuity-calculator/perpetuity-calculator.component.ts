import { Component } from '@angular/core';

@Component({
  selector: 'app-perpetuity-calculator',
  templateUrl: './perpetuity-calculator.component.html',
  styleUrls: ['./perpetuity-calculator.component.scss']
})
export class PerpetuityCalculatorComponent {
  controls = {
    annualCashFlow: new FormControl(250000),
    discountRate: new FormControl(.05),
  }

  form = new FormGroup(this.controls);


  principal = this.form.valueChanges.pipe(
    map(() => {
      return this.calculatePerpetuity();
    }),
    startWith(this.calculatePerpetuity())
  );

  calculatePerpetuity() {
    return calculatePerpetuity(
      this.controls.annualCashFlow.value,
      this.controls.discountRate.value,
    );
  }
  
  constructor() {}
}
import { FormControl, FormGroup } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';



function calculatePerpetuity (annualCashFlow: number, discountRate:number) {
  return annualCashFlow / discountRate
}
