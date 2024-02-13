import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../services/routing.service';

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
    ) {

  }
}
