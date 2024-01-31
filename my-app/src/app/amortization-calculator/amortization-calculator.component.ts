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
import { calculateAmortizationPayment } from '../third_party/models/amortization';

