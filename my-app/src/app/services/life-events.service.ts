import { Injectable } from '@angular/core';
import { createLifeEventsAddTypeRoute, createLifeEventsEditTypeRoute } from '../utils/route_mapper';
import { MayaUserExperienceService } from './maya-user-experience.service';
import { Cash, Component, Job, SavingsAccount, Stocks } from '../utils/maya-ecs-components';


interface Field {

}

/**
 * Life event is expressed semantically. 
 * Before use in simulation, should be expanded deterministically
 */
export interface LifeEvent {
  name: string;
  icon: string;
  type: string;
  addHref: string;
  editHref: string;
  fields: Field[];
  createComponent: () => Component;
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
}

const fieldsMap = {

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

const shorthand: Array<[string, ()=>Component]> = [
  ['Cash', () => new Cash(5e3)],
  ['Savings Account', () => new SavingsAccount(5e4, [.01, .05])],
  ['Job', () => new Job(1e5)],
  ['Stocks', () => new Stocks(4e5, [...new Array(4).fill(1.1), .75])],
];

const availableLifeEvents = shorthand.map(([name, createComponent]) => {
  const key = Object.keys(iconMap).find(key => name.toLocaleLowerCase().includes(key));
  const icon = iconMap[key] ?? 'question_mark';
  const fields:Field[] = fieldsMap[key] ?? [];
  
  return {
    name,
    icon,
    createComponent, 
    fields,
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

  selectedLifeEvents:LifeEvent[] = [];

  addLifeEvent(lifeEvent: LifeEvent) {
    this.selectedLifeEvents = [...this.selectedLifeEvents,{...lifeEvent}];
    const components = this.selectedLifeEvents.map(lifeEvent => lifeEvent.createComponent());
    this.muxs.components.next(components);
  }
  removeLifeEvent(index: number) {
    this.selectedLifeEvents.splice(index, 1);
  }

  constructor(
    private muxs: MayaUserExperienceService
  ) { 
    this.availableLifeEvents.slice(0,5).forEach(this.addLifeEvent.bind(this))
  }
}

function convertNameToType(name: string):string {
  return name.replaceAll(' ','-').toLocaleLowerCase()
}

function generateDerivativeFields(v: {name: string, icon: string, createComponent: () => Component, fields: Field[]}): LifeEvent {
  // auto generate derivative fields
  const type = convertNameToType(v.name);
  const addHref = createLifeEventsAddTypeRoute(type);
  const editHref = createLifeEventsEditTypeRoute(type);

  return {
    ...v,
    type,
    addHref,
    editHref,
  };
}
  

