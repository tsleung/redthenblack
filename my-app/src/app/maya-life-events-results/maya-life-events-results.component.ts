import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';

@Component({
  selector: 'app-maya-life-events-results',
  templateUrl: './maya-life-events-results.component.html',
  styleUrls: ['./maya-life-events-results.component.scss']
})
export class MayaLifeEventsResultsComponent {
  constructor(
    public lifeEventsService: LifeEventsService,
    public muxs: MayaUserExperienceService,
    ){}
}
