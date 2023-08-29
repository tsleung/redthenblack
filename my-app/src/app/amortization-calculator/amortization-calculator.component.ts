import { Component } from '@angular/core';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-amortization-calculator',
  templateUrl: './amortization-calculator.component.html',
  styleUrls: ['./amortization-calculator.component.scss']
})
export class AmortizationCalculatorComponent {
  controls = {
    numYears: new FormControl(30),
    annualRate: new FormControl(0.02875),
    principal: new FormControl(4.16e5),
    
  }

  form = new FormGroup(this.controls);


  amortization = this.form.valueChanges.pipe(
    map(() => {
      return this.calculateAmortization();
    }),
    startWith(this.calculateAmortization())
  );

  calculateAmortization() {
    return calculateAmortizationPayment(
      this.controls.annualRate.value / 12,
      this.controls.numYears.value * 12,
      this.controls.principal.value,
    );
  }


  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';

/**
 * 
 * @param i interest rate, annual / 12 if monthly payments
 * @param n number of payments, annual * 12 if monthly
 */
function calculateAmortizationPayment (i, n, loan) {
  const top = i * Math.pow((1+i), n);
  const bottom = Math.pow((1+i), n) - 1;

  return loan * top / bottom;
}
