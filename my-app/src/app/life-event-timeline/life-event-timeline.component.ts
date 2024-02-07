import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { map } from 'rxjs/operators';
import { ComponentType, Contribution } from '../utils/maya-ecs-components';
import { fetchAllByType } from '../utils/life-event-utils';
import { Observable } from 'rxjs';

interface Timeline {
  items: TimelineItem[];
  min: number;
  max: number;
}

interface TimelineItem {
  label: string;
  highlight: number;
  start: number;
  end: number;
}

@Component({
  selector: 'app-life-event-timeline',
  templateUrl: './life-event-timeline.component.html',
  styleUrl: './life-event-timeline.component.scss'
})
export class LifeEventTimelineComponent {

  timeline:Observable<Timeline> = this.muxs.components.pipe(map(collection => {
    const contributions = fetchAllByType<Contribution>(collection, ComponentType.Contribution)
    const items:TimelineItem[] = contributions.map(contribution => {
      return {
        label: contribution.key,
        highlight: contribution.contribution,
        start: contribution.startPeriod,
        end: contribution.startPeriod + contribution.periods,
      };
    });

    console.log('items', items);
    return {
      min: 0,
      max: this.muxs.calculateTotalNumberOfPeriods(),
      items,
    };
  }));

  constructor(
    readonly lifeEventService: LifeEventsService,
    readonly muxs: MayaUserExperienceService,) {
  }
}
