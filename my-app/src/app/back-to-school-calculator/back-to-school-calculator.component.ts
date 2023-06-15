import { Component } from '@angular/core';

/** Whether or not to go for a masters for higher pay, also utility of new degree */
@Component({
  selector: 'app-back-to-school-calculator',
  templateUrl: './back-to-school-calculator.component.html',
  styleUrls: ['./back-to-school-calculator.component.scss']
})
export class BackToSchoolCalculatorComponent {
  controls = {
    numPeriods: new FormControl(30),
  }

  form = new FormGroup(this.controls);

  
  constructor() {

  }
}
import { FormControl, FormGroup } from '@angular/forms';