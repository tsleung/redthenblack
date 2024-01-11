import { Component, Input } from '@angular/core';
import { LifeEvent, LifeEventsService } from '../services/life-events.service';

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
