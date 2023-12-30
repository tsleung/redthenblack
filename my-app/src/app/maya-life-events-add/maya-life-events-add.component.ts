import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LifeEvent, LifeEventsService } from '../services/life-events.service';
import { RoutingService } from '../services/routing.service';
import { createLifeEventsRoute } from '../utils/route_mapper';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-maya-life-events-add',
  templateUrl: './maya-life-events-add.component.html',
  styleUrls: ['./maya-life-events-add.component.scss']
})
export class MayaLifeEventsAddComponent {

  parameters = this.route.data;
  lifeEvent = this.route.params.pipe(map((params) => {
    const type = params.type ?? 'custom';
    const lifeEvent:LifeEvent = this.lifeEventsService.availableLifeEvents.find(suspect => {
      return suspect.type === type;
    });
    return lifeEvent;
  }));

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private readonly lifeEventsService: LifeEventsService,
    private readonly routingService: RoutingService,
    ) {
      
  }

  addLifeEvent(e,lifeEvent) {
    e.preventDefault();
    this.lifeEventsService.addLifeEvent(lifeEvent);
    this.router.navigate([createLifeEventsRoute()]);
    return false;
  }
}
