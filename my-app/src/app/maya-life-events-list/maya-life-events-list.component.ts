import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-maya-life-events-list',
  templateUrl: './maya-life-events-list.component.html',
  styleUrls: ['./maya-life-events-list.component.scss']
})
export class MayaLifeEventsListComponent {
  constructor(
    readonly routingService: RoutingService,
    readonly lifeEventsService: LifeEventsService,
    ) {}
    
}
