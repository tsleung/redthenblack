import { Component } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../services/routing.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { createLifeEventsRoute } from '../utils/route_mapper';
import { PrompterService } from '../services/prompter.service';
import { SharedSheetService } from '../services/shared-sheet.service';
import { DatabaseService } from '../services/database.service';

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

  sharedSheets = this.sharedSheetService.sharedSheets;

  constructor(
    readonly firebaseService: DatabaseService,
    readonly routingService: RoutingService,
    readonly muxs: MayaUserExperienceService,
    readonly sharedSheetService: SharedSheetService
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
