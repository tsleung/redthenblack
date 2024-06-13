import { Injectable } from '@angular/core';
import { createLifeEventsAddTypeRoute, createLifeEventsEditTypeRoute, createMayaOnboarding } from '../utils/route_mapper';
import { MayaUserExperienceService } from './maya-user-experience.service';
import { filter, first, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { availableLifeEvents, createHighlightNumber } from '../config/life-event-config';
import { LifeEvent, convertComponentsToLifeEvents } from '../utils/life-event-utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingService } from './routing.service';
import { DatabaseService } from './database.service';

const SNACKBAR_DURATION = 2000;

/**
 * All life events are kept in a single collection
 * For each period, look at life event to figure out what to do. 
 * Like the order of which event to process first will *matter*
 */
@Injectable({
  providedIn: 'root'
})
export class LifeEventsService {

  readonly availableLifeEvents:LifeEvent[] = availableLifeEvents;

  selectedLifeEvents: Observable<LifeEvent[]> = this.muxs.components.pipe(map(components => {
    console.log('les: loading selected life events',components)
    return convertComponentsToLifeEvents(
      Array.from(components.values()),
      this.availableLifeEvents,
    )
  }),
  // shareReplay(),
  );
  
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
    readonly databaseService: DatabaseService,
    readonly snackbar: MatSnackBar,
    readonly routingService: RoutingService,
  ) {
    console.log('les.constructor')
  }

  loginAndSave() {
    this.muxs.components.pipe(
      filter(components => components.size > 0), 
      first(),
      ).subscribe(componentMap => {
        
        const components = Array.from(componentMap.values()).map(component => component);
        console.log('saving components json', components);
        const json = structuredClone({components});
        this.databaseService.signInAndSave(json);
        this.snackbar.open('Logged in and saved', undefined ,{duration: SNACKBAR_DURATION});
    });
  }
  save() {
    this.muxs.components.pipe(
      filter(components => components.size > 0), 
      first(),
      ).subscribe(componentMap => {
        
        const components = Array.from(componentMap.values()).map(component => component);
        console.log('saving components json', components);
        const json = structuredClone({components});
        this.databaseService.setActiveScenario(json);
        this.snackbar.open('Saved', undefined ,{duration: SNACKBAR_DURATION});
    });
  }
  delete() {
    this.databaseService.deleteActiveScenario().then(() => {
      this.muxs.resetComponents();
      this.snackbar.open('Deleted Active Scenario', undefined ,{duration: SNACKBAR_DURATION});

      this.routingService.navigate(createMayaOnboarding());
    });
    
  }
  load() {
    this.muxs.resetComponents();
    this.snackbar.open('Loaded from last Saved', undefined ,{duration: SNACKBAR_DURATION});
  }
  login() {
    this.databaseService.login();
    this.snackbar.open('Logged in', undefined ,{duration: SNACKBAR_DURATION});
  }
  logout() {
    this.databaseService.logout();
    this.snackbar.open('Logged out', undefined ,{duration: SNACKBAR_DURATION});
  }
}

