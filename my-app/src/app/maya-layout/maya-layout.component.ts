import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-maya-layout',
  templateUrl: './maya-layout.component.html',
  styleUrls: ['./maya-layout.component.scss']
})
export class MayaLayoutComponent {
  constructor(
    readonly routingService: RoutingService
  ){

  }

}
