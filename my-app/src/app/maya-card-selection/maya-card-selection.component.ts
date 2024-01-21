import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-maya-card-selection',
  templateUrl: './maya-card-selection.component.html',
  styleUrls: ['./maya-card-selection.component.scss']
})
export class MayaCardSelectionComponent {

  constructor(readonly routingService: RoutingService) {}
}

