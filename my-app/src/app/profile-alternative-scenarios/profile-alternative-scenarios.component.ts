import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../services/routing.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { createLifeEventsRoute } from '../utils/route_mapper';

@Component({
  selector: 'app-profile-alternative-scenarios',
  templateUrl: './profile-alternative-scenarios.component.html',
  styleUrl: './profile-alternative-scenarios.component.scss'
})
export class ProfileAlternativeScenariosComponent {

  activeScenario = from(this.firebaseService.loadActiveScenario()).pipe(map(activeScenario => {
    console.log('active scenario', activeScenario);
    return activeScenario;
  }));

  alternativeScenarios = from(this.firebaseService.loadAlternativeScenariosForCurrentUser()).pipe(map(docs => {
    console.log('docs', docs);
    return docs;
  }));

  constructor(
    readonly firebaseService: FirebaseService,
    readonly routingService: RoutingService,
    readonly muxs: MayaUserExperienceService
    ) {

  }

  convertSavedActiveScenarioToAlternativeScenario() {
    this.firebaseService.convertSavedActiveScenarioToAlternativeScenario().then(() => {
      window.location.reload();
    });
  }

  convertAlternativeScenarioToActiveScenario(id: string) {
    this.firebaseService.convertAlternativeScenarioToActiveScenario(id).then(() => {
      this.routingService.navigate(createLifeEventsRoute());
    })
  }

  deleteAlternativeScenario(id: string) {
    this.firebaseService.deleteAlternativeScenario(id).then(() => {
      window.location.reload();
    })
  }


}
