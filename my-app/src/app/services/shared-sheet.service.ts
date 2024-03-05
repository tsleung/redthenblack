import { Injectable } from '@angular/core';
import { PrompterService } from './prompter.service';
import { FirebaseService, ServerMessageType } from './firebase.service';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { Component } from '../utils/maya-ecs-components';
import { Scenario, ScenarioService } from './scenario.service';
import { RoutingService } from './routing.service';
import { createSharedSheetRoute } from '../utils/route_mapper';


interface SharedSheet {
  title: string;
  description: string;
  sections: SharedSection[];
}

interface SharedSection {
  title: string;
  description: string;
  scenarioId: string;
  scenario: {components: Component[]};
}

@Injectable({
  providedIn: 'root'
})
export class SharedSheetService {

  constructor(
    readonly prompterService: PrompterService,
    readonly firebaseService: FirebaseService,
    readonly scenarioService: ScenarioService,
    readonly routingService: RoutingService,
  ) { }

  
  sharedSheets = this.firebaseService.serverMessenger.pipe(
    filter(message => {
      return message.type != ServerMessageType.READ;
    }),
    switchMap(() => {
      return this.firebaseService.listSharedSheetsForCurrentUser();
    }),
    shareReplay(),
  );
  
  async promptRenameSheet(id:string) {
    // load
    const sharedSheet = await this.loadSharedSheet(id);
    // prompt
    const title = this.prompterService.prompt('Title', sharedSheet.data().title) ??  sharedSheet.data().title;

    const json = structuredClone(sharedSheet.data());
    // patch and save
    this.firebaseService.saveSharedSheet({...json, title}, id);
  }


  loadSharedSheet(id:string) {
    return this.firebaseService.loadSharedSheet(id);
  }


  async createSharedSheet(
    id: string,
    scenario: Scenario
  ) {
    // rather than prompt, just create and let them edit later
    // const title = await this.prompterService.prompt('Title', `Shared: ${scenario.title}`);
    // const description = await this.prompterService.prompt('Description');
    const title = scenario.title;
    const description = scenario.components.map(component => component.key).join(', ');
    const sections = [{
      title, 
      description, 
      scenarioId: id, 
      scenario,
    }];
    console.log('scenario', scenario)
    console.log('sections', sections)
    this.firebaseService.createSharedSheet(title, {sections}).then(result => {
      const id = result.id;
      this.routingService.navigate(createSharedSheetRoute(id));
    });
  }

  
}
