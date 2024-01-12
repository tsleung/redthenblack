import { Injectable } from '@angular/core';
import { createLifeEventsAddTypeRoute, createLifeEventsEditTypeRoute } from '../utils/route_mapper';
import { MayaUserExperienceService } from './maya-user-experience.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { availableLifeEvents } from '../config/life-event-config';
import { LifeEvent } from '../utils/life-event-utils';



/**
 * All life events are kept in a single collection
 * For each period, look at life event to figure out what to do. 
 * Like the order of which event to process first will *matter*
 */
@Injectable({
  providedIn: 'root'
})
export class LifeEventsService {

  readonly availableLifeEvents = availableLifeEvents
    .map(v => generateDerivativeFields(v));

  selectedLifeEvents: Observable<LifeEvent[]> = this.muxs.components.pipe(map(components => {

    return Array.from(components.values()).map(component => {
      const lifeEvent = this.availableLifeEvents.find(suspect => suspect.componentKey === component.key);
      lifeEvent.fields.forEach(field => {
        field.readFrom(component, field);
      });

      return lifeEvent;
    }).filter(Boolean);
  }));

  addLifeEvent(lifeEvent: LifeEvent) {
    console.log('adding life evnt', lifeEvent)
    // this.muxs.addComponent.next(lifeEvent.createComponent());

    // create a component, update all the fields from the life event, then add
    // here we should iterate through the fields and craete a 
    const component = lifeEvent.createComponent();
    lifeEvent.fields.forEach(field => {
      field.updateTo(component, field);
    });

    this.muxs.addComponent.next(component);
  }

  /**
   * Takes a life event, finds the existing component, and updates based on the field values?
   */
  updateLifeEvent(lifeEvent: LifeEvent) {
    // create a component, update all the fields from the life event, then add
    // here we should iterate through the fields and craete a 
    const component = lifeEvent.createComponent();
    lifeEvent.fields.forEach(field => {
      field.updateTo(component, field);
    });

    this.muxs.addComponent.next(component);
  }

  removeLifeEvent(lifeEvent: LifeEvent) {
    // kinda hacky, don't need to create. work on an interface
    console.log('removing life event')
    this.muxs.removeComponent.next(lifeEvent.createComponent());
  }
  constructor(
    private muxs: MayaUserExperienceService,
  ) { }
}

function generateDerivativeFields(v: Partial<LifeEvent>): LifeEvent {
  // auto generate derivative fields

  const addHref = createLifeEventsAddTypeRoute(v.componentKey);
  const editHref = createLifeEventsEditTypeRoute(v.componentKey);
  const createFriendlyFieldDescription = () => {
    return lifeEvent.fields.map(field => `${field.name}: ${field.value}`).join(', ');
  };
  const lifeEvent = {
    ...v,
    addHref,
    editHref,
    createFriendlyFieldDescription,
  } as LifeEvent;

  return lifeEvent;
}
