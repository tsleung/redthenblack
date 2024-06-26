import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../services/routing.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { createLifeEventsRoute } from '../utils/route_mapper';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-share-scenario',
  templateUrl: './share-scenario.component.html',
  styleUrl: './share-scenario.component.scss'
})
export class ShareScenarioComponent {
  id = this.route.params.pipe(map(params => {
    const id = params.id;
    return id;
  }));

  scenario = this.id.pipe(
    filter(id => id), 
    switchMap(id => {
      return this.firebaseService.loadAlternativeScenario(id);
  }));

  constructor(
    private route: ActivatedRoute, 
    readonly routingService: RoutingService,
    private firebaseService: DatabaseService,
    ) {

  }
  convertAlternativeScenarioToActiveScenario(id: string) {
    this.firebaseService.convertAlternativeScenarioToActiveScenario(id).then(() => {
      this.routingService.navigate(createLifeEventsRoute());
    })
  }

}
