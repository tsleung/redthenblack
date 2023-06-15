import { Component } from '@angular/core';

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