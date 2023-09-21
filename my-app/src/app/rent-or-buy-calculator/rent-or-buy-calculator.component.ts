import { Component } from '@angular/core';

@Component({
  selector: 'app-rent-or-buy-calculator',
  templateUrl: './rent-or-buy-calculator.component.html',
  styleUrls: ['./rent-or-buy-calculator.component.scss']
})
export class RentOrBuyCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
    // rent
    rentAnnually: new FormControl(3700),
    rentInflation: new FormControl(1.09),
    // buy
    propertyPrincipal: new FormControl(1e6),
    downPayment: new FormControl(.2),
    mortgageRate: new FormControl(.05),
    mortgageDuration: new FormControl(30),
    delayUntilPurchase: new FormControl(0),
    
    // calculate opportunity cost in investments

  }
  form = new FormGroup(this.controls);

  fund = this.form.valueChanges.pipe(
    map(() => {
      return this.calculate();
    }),
    startWith(this.calculate()),
    publishReplay(),
    refCount(),
  );
  
  calculate() {
    return calculate(
      this.controls.numPeriods.value,
    );
  }
  
  constructor() { }
}
import { FormControl, FormGroup } from '@angular/forms';
import { map, publishReplay, refCount, startWith } from 'rxjs/operators';

function calculateRent(
  numPeriods: number,
  rentAnnually: number,
  rentInflation: number,
) {

  new Array(numPeriods).fill(0).reduce((accum, v, i) => {
    const pastRent = accum.at(-1);
    const updatedRent = pastRent * rentInflation;

    return [...accum, updatedRent];
  }, [rentAnnually]);

}

function calculateMortgage(
  numPeriods: number,
  propertyPrincipal: number,
  downPayment:  number,
  mortgageRate:  number,
  mortgageDuration:  number,
) {

}

function calculate(
  numPeriods: number,
) {

}