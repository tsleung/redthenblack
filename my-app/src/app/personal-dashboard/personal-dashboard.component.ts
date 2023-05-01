import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-personal-dashboard',
  templateUrl: './personal-dashboard.component.html',
  styleUrls: ['./personal-dashboard.component.scss']
})
export class PersonalDashboardComponent {
  constructor(
    readonly routingService: RoutingService
  ){

  }
}
