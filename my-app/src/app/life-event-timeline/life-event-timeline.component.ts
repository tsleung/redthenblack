import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { map } from 'rxjs/operators';
import { AmortizedLoan, ComponentType, Contribution, ContributionComponent, PolynomialAllocation, Value, VolatileAsset } from '../utils/maya-ecs-components';
import { Observable } from 'rxjs';
import { fetchAllByType } from '../utils/maya-ecs-utils';
import { createAmortizedLoanHighlight, createContributionHighlight, createPolynomialAllocationHighlight, createValueHighlight, createVolatileAssetHighlight } from '../config/life-event-config';
import { createLifeEventsEditTypeRoute, createLoanTypeRoute, createPolynomialTypeRoute } from '../utils/route_mapper';

interface Timeline {
  items: TimelineItem[];
  min: number;
  max: number;
}

interface TimelineItem {
  label: string;
  highlight: string;
  start: number;
  end: number;
  enabled?: boolean;
  editHref: string;
  startChange?: (val:number) => void;
  endChange?: (val:number) => void;
}

@Component({
  selector: 'app-life-event-timeline',
  templateUrl: './life-event-timeline.component.html',
  styleUrl: './life-event-timeline.component.scss'
})
export class LifeEventTimelineComponent {

  timeline:Observable<Timeline> = this.muxs.components.pipe(map(collection => {
    const min = 0;
    const max = this.muxs.calculateTotalNumberOfPeriods();

    const items:TimelineItem[] = Array.from(collection.values()).map(component => {
      switch (component.type) {
        case ComponentType.Contribution:
          const contribution = component as ContributionComponent;
          const item:TimelineItem = {
            label: contribution.key,
            highlight: createContributionHighlight(contribution),
            start: contribution.startPeriod,
            end: contribution.startPeriod + contribution.periods,    
            enabled: true,
            editHref: createLifeEventsEditTypeRoute(component.key)
          };
          item.startChange = (val: number) => {
            const difference = contribution.startPeriod - val;
            contribution.startPeriod = val;
            contribution.periods = difference + contribution.periods
            this.muxs.addComponent.next(contribution)
          }
          item.endChange = (val: number) => {
            contribution.periods = val - item.start;
            this.muxs.addComponent.next(contribution)
          }

          return item;
        case ComponentType.PolynomialAllocation:
          const polynomial = component as PolynomialAllocation;
          return {
            label: polynomial.key,
            highlight: createPolynomialAllocationHighlight(polynomial),
            start: polynomial.startPeriod,
            end: polynomial.startPeriod + polynomial.periods,    
            editHref: createPolynomialTypeRoute(component.key)
          }
        case ComponentType.VolatileAsset:
          const volatileAsset = component as VolatileAsset;
          return {
            label: volatileAsset.key,
            highlight: createVolatileAssetHighlight(volatileAsset),
            start: volatileAsset.startPeriod,
            end: max,
            editHref: createLifeEventsEditTypeRoute(component.key)
          }
        case ComponentType.Value:
          const value = component as Value;
          return {
            label: value.key,
            highlight: createValueHighlight(value),
            start: min,
            end: max,
            editHref: createLifeEventsEditTypeRoute(component.key)
          }
        case ComponentType.AmortizedLoan:
          const loan = component as AmortizedLoan;
          return {
            label: loan.key,
            highlight: createAmortizedLoanHighlight(loan),
            start: min,
            end: max,
            editHref: createLoanTypeRoute(component.key)
          }
        default:
          return {
            label: component.key,
            highlight: '',
            start: 0,
            end: 0,
            editHref: createLifeEventsEditTypeRoute(component.key)
          }
      }
    });

    // UX cleanup so nothing < 0 or > max
    items.forEach(item => {
      item.start = Math.max(0, item.start);
      item.end = Math.min(max, item.end);
    });

    console.log('items', items);

    // put the items that can be modified first
    items.sort((a,b) => a.enabled ? -1 : 1)
    return {
      min,
      max,
      items,
    };
  }));

  constructor(
    readonly lifeEventService: LifeEventsService,
    readonly muxs: MayaUserExperienceService,) {
  }

  dragStart(e) {
    console.log('start', e)
  }

  dragEnd(e) {
    console.log('end', e)
  }
  
}
