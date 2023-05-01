import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-maya-onboard',
  templateUrl: './maya-onboard.component.html',
  styleUrls: ['./maya-onboard.component.scss']
})
export class MayaOnboardComponent {
  constructor(
    readonly routingService: RoutingService
  ) {
  }

  controls = {
    workingYears: new FormControl(),
    savingsRate: new FormControl(),
  }

  form = new FormGroup(this.controls);

}
