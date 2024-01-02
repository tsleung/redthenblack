import { Injectable } from '@angular/core';
import { createLifeEventsAddTypeRoute, createLifeEventsEditTypeRoute } from '../utils/route_mapper';
import { MayaUserExperienceService } from './maya-user-experience.service';
import { Cash, Component, ComponentKey, CostOfLiving, Job, Retirement, SavingsAccount, Stocks } from '../utils/maya-ecs-components';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


interface Field {
  name: string;
}

/**
 * Life event is expressed semantically. 
 * Before use in simulation, should be expanded deterministically
 */
export interface LifeEvent {
  name: string;
  icon: string;
  addHref: string;
  editHref: string;
  fields: Field[];
  componentKey: ComponentKey;
  createComponent: () => Component;
  addLifeEvent: () => void;
  removeLifeEvent: () => void;
}


/** This may be better to reverse, icon as key and tags as matches */
const iconMap = {
  car: 'directions_car',
  housing: 'home',
  travel: 'flight_takeoff',
  wedding: 'favorite',
  school: 'school',
  children: 'child_care',
  medical: 'medical_services',
  fertility: 'baby_changing_station',
  insurance: 'restore_page',
  gifts: 'redeem',
  inheritance: 'next_plan',
  entrepreneurship: 'work',
  cash: 'local_atm',
  savings: 'account_balance',
  job: 'work',
  investment: 'trending_up',
}

const fieldsMap = {
  cash: [
    {name: 'value'},
  ]
};

const samples = [
  'Car (Lease)',
  'Car (Finance)',
  'Car (Buy out)',
  'Housing (Own)',
  'Housing (Rent)',
  'Housing (Investment)',
  'Travel',
  'Wedding',
  'School',
  'Children',
  'Medical',
  'Fertility',
  'Bereavement',
  'Renovation and Repairs',
  'Inheritance',
  'Gifts',
  'Insurance',
  'Entrepreneurship',
  'Asset flow in', 
  'Asset flow out', 
  'Income', 
  'Spend', 
  'Asset', 
  'Investment', 
];

const shorthand: Array<[string, ComponentKey, ()=>Component]> = [
  ['Cash',ComponentKey.Cash, () => new Cash(5e3)],
  ['Cost of Living',ComponentKey.CostOfLiving, () => new CostOfLiving(5e4)],
  ['Job',ComponentKey.Job, () => new Job(1e5, 10)],
  ['Retirement',ComponentKey.Retirement, () => new Retirement(15)],
  ['Stocks',ComponentKey.Stocks, () => new Stocks(4e5, [...new Array(4).fill(1.1), .75])],
  ['Savings Account',ComponentKey.SavingsAccount, () => new SavingsAccount(5e4, [.01, .05])],
  
];

const availableLifeEvents = shorthand.map(([name, componentKey, createComponent]) => {
  const key = Object.keys(iconMap).find(key => name.toLocaleLowerCase().includes(key));
  const icon = iconMap[key] ?? 'question_mark';
  const fields:Field[] = fieldsMap[key] ?? [];
  
  return {
    name,
    icon,
    createComponent, 
    fields,
    componentKey,
  };
});

/**
 * All life events are kept in a single collection
 * For each period, look at life event to figure out what to do. 
 * Like the order of which event to process first will *matter*
 */
@Injectable({
  providedIn: 'root'
})
export class LifeEventsService {

  readonly availableLifeEvents = availableLifeEvents
    .map(v => generateDerivativeFields(v));

  selectedLifeEvents:Observable<LifeEvent[]> = this.muxs.components.pipe(map(components => {
    
    return Array.from(components.values()).map(component => {
      const found = this.availableLifeEvents.find(suspect => suspect.componentKey === component.key);
      return found;
    }).filter(Boolean);
  }));
  
  addLifeEvent(lifeEvent: LifeEvent) {
    console.log('adding life evnt',lifeEvent)
    this.muxs.addComponent.next(lifeEvent.createComponent());
  }

  removeLifeEvent(lifeEvent: LifeEvent) {
    // kinda hacky, don't need to create. work on an interface
    console.log('removing life event')
    this.muxs.removeComponent.next(lifeEvent.createComponent());
  }

  constructor(
    private muxs: MayaUserExperienceService
  ) {}
}

function generateDerivativeFields(v: {name: string, icon: string,componentKey: ComponentKey, createComponent: () => Component, fields: Field[]}): LifeEvent {
  // auto generate derivative fields
  
  const addHref = createLifeEventsAddTypeRoute(v.componentKey);
  const editHref = createLifeEventsEditTypeRoute(v.componentKey);

  return {
    ...v,
    addHref,
    editHref,
    addLifeEvent: () => {},
    removeLifeEvent: () => {},
  };
}
  

