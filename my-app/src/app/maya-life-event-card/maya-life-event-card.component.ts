import { Component, Input } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { LifeEvent } from '../utils/life-event-utils';

@Component({
  selector: 'app-maya-life-event-card',
  templateUrl: './maya-life-event-card.component.html',
  styleUrls: ['./maya-life-event-card.component.scss']
})
export class MayaLifeEventCardComponent {

  @Input() lifeEvent: LifeEvent;
  @Input() actionable = false;

  constructor(
    readonly lifeEventsService: LifeEventsService,
  ) {}
}
