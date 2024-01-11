import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LifeEvent, LifeEventsService } from '../services/life-events.service';
import { RoutingService } from '../services/routing.service';
import { createLifeEventsRoute } from '../utils/route_mapper';
import { map, switchMap } from 'rxjs/operators';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';


interface EditableLifeComponent {
  lifeEvent: LifeEvent;
  component: Component;
}


/**
 * This component should be an experience which focuses on UX of modifying a set of fields
 * 
 * The fields / user experience can be dynamically determined. 
 * The goal is to have the information required to render an 
 * editor, with default values or those already saved for a 
 * component, and a save button that will create a new (if not
 * added) or edit the component in place
 */
@Component({
  selector: 'app-maya-life-events-add',
  templateUrl: './maya-life-events-add.component.html',
  styleUrls: ['./maya-life-events-add.component.scss']
})
export class MayaLifeEventsAddComponent {

  parameters = this.route.data;
  lifeEvent = this.route.params.pipe(map((params) => {
    const componentKey = params.type ?? 'custom';
    const lifeEvent: LifeEvent = this.lifeEventsService.availableLifeEvents.find(suspect => {
      console.log('componentKey/type', componentKey)

      return suspect.componentKey === componentKey;
    });
    return lifeEvent;
  }),
    switchMap(lifeEvent => {
      // override defaults from add, if applicable
      return this.muxs.components.pipe(map(components => {
        // in each field, overwrite if there is a component available

        const component = Array.from(components.values()).find(suspect => suspect.key === lifeEvent.componentKey) ?? lifeEvent.createComponent();

        lifeEvent.fields.forEach(field => {
          // run mutation
          field.readFrom(component, field);
        });
        
        return lifeEvent;
      }));
    })
  );

  constructor(private route: ActivatedRoute,
    private router: Router,
    private readonly lifeEventsService: LifeEventsService,
    private readonly routingService: RoutingService,
    private readonly muxs: MayaUserExperienceService,
  ) { }


  saveForm(e, lifeEvent: LifeEvent) {
    e.preventDefault();
    e.stopPropagation();

    const data = new FormData(e.target);

    lifeEvent.fields.forEach(field => {
      field.value = data.get(field.name).valueOf() as string;
    });

    this.lifeEventsService.updateLifeEvent(lifeEvent);
    this.router.navigate([createLifeEventsRoute()]);
    return false;
  }
}
