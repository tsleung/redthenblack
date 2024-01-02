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
    const componentKey = params.type ?? 'custom';
    const lifeEvent:LifeEvent = this.lifeEventsService.availableLifeEvents.find(suspect => {
      console.log('componentKey/type', componentKey)
      return suspect.componentKey === componentKey;
    });
    return lifeEvent;
  }));

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private readonly lifeEventsService: LifeEventsService,
    private readonly routingService: RoutingService,
    ) {   }


  saveForm(e, lifeEvent) {
    e.preventDefault();
    e.stopPropagation();

    const data = new FormData(e.target);

    lifeEvent.fields.forEach(field => {
      field.value = data.get(lifeEvent.field.name);
    });

    this.lifeEventsService.addLifeEvent(lifeEvent);
    this.router.navigate([createLifeEventsRoute()]);
    return false;  
  }
  addLifeEvent(e,lifeEvent) {
    e.preventDefault();
    this.lifeEventsService.addLifeEvent(lifeEvent);
    this.router.navigate([createLifeEventsRoute()]);
    return false;
  }
}
