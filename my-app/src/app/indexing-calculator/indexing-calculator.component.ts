import { Component } from '@angular/core';

/**
 * Can you write a web article that takes 20 minutes to read for an undergraduate which describes the quantitative approach to evaluating index investing over variable length retirement horizon. This should include the risks of inflation, equity risk premium, interest rates, sharpe ratio, volatility, rebalancing, and optimal bet sizing. Mention any generalized rule of thumb is a risky assumption given personal suitability of retirement horizons. Stress benefits of confidence intervals and monte carlo simulation methods for personal situations.
 */

@Component({
  selector: 'app-indexing-calculator',
  templateUrl: './indexing-calculator.component.html',
  styleUrls: ['./indexing-calculator.component.scss']
})
export class IndexingCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';