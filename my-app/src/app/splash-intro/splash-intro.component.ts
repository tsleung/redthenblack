import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-splash-intro',
  templateUrl: './splash-intro.component.html',
  styleUrls: ['./splash-intro.component.scss']
})
export class SplashIntroComponent {
  constructor(
    readonly routingService: RoutingService
  ){

  }

}
