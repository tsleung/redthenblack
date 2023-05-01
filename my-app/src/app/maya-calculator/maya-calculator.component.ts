import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-maya-calculator',
  templateUrl: './maya-calculator.component.html',
  styleUrls: ['./maya-calculator.component.scss']
})
export class MayaCalculatorComponent {
  constructor(
    readonly routingService: RoutingService
  ){

  }
}
