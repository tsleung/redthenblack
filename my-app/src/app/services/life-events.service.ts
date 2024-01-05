import { Injectable } from '@angular/core';
import { createLifeEventsAddTypeRoute, createLifeEventsEditTypeRoute } from '../utils/route_mapper';
import { MayaUserExperienceService } from './maya-user-experience.service';
import { Cash, Component, ComponentKey, CostOfLiving, Job, Retirement, SavingsAccount, Stocks } from '../utils/maya-ecs-components';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


interface Field {
  name: string;
  value: string|number;
  readFrom: (component:Component, field:Field) => void;
  updateTo: (component:Component, field:Field) => void;
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
  createFriendlyFieldDescription: () => string;
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
  'Cash': [
    {
      name: 'Balance', 
      value: 0, 
      readFrom:(cash: Cash, field:Field) =>{
        field.value = cash.value;
      },
      updateTo:(cash: Cash, field:Field) => {
        cash.value = field.value;
      }
    },
  ],
  'Stocks': [
    {
      name: 'Market Value', 
      value: 0, 
      readFrom:(component: Stocks, field:Field) =>{
        field.value = component.value;
      },
      updateTo:(component: Stocks, field:Field) => {
        component.value = field.value;
      }
    },
    {
      name: 'Annual Returns', 
      value: 0, 
      readFrom:(component: Stocks, field:Field) =>{
        field.value = component.annualReturns.join(', ');
      },
      updateTo:(component: Stocks, field:Field) => {
        component.annualReturns = `${field.value}`.split(',').map(v => v.trim()).map(Boolean).map(Number);
      }
    },
  ],
  
  'Savings Account': [
    {
      name: 'Balance', 
      value: 0, 
      readFrom:(component: SavingsAccount, field:Field) =>{
        field.value = component.value;
      },
      updateTo:(component: SavingsAccount, field:Field) => {
        component.value = field.value;
      }
    },
    {
      name: 'Interest Rate', 
      value: 0, 
      readFrom:(component: SavingsAccount, field:Field) =>{
        field.value = component.interestRates.join(', ');
      },
      updateTo:(component: SavingsAccount, field:Field) => {
        component.value = `${field.value}`.split(',').map(v => v.trim()).map(Boolean).map(Number);
      }
    },
  ],
  
  'Job': [
    {
      name: 'Annual Savings after Income', 
      value: 0, 
      readFrom:(component: Job, field:Field) =>{
        field.value = component.cashFlow;
      },
      updateTo:(component: Job, field:Field) => {
        component.cashFlow = field.value;
      }
    },
  ],
  
  'Cost Of Living': [
    {
      name: 'Annual Expenses', 
      value: 0, 
      readFrom:(component: CostOfLiving, field:Field) =>{
        field.value = component.cashFlow;
      },
      updateTo:(component: CostOfLiving, field:Field) => {
        component.cashFlow = field.value;
      }
    },
  ],
  
  'Retirement': [
    {
      name: 'Years until retirement', 
      value: 0, 
      readFrom:(component: Retirement, field:Field) =>{
        field.value = component.period;
      },
      updateTo:(component: Retirement, field:Field) => {
        component.period = field.value;
      }
    },
  ],
  
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
  ['Stocks',ComponentKey.Stocks, () => new Stocks(4e5, [...new Array(4).fill(1.1), .75])],
  ['Savings Account',ComponentKey.SavingsAccount, () => new SavingsAccount(5e4, [.01, .05])],
  ['Job',ComponentKey.Job, () => new Job(1e5, 10)],
  ['Cost of Living',ComponentKey.CostOfLiving, () => new CostOfLiving(5e4)],
  ['Retirement',ComponentKey.Retirement, () => new Retirement(15)],
  
  
  
];

const availableLifeEvents = shorthand.map(([name, componentKey, createComponent, ]) => {
  const key = Object.keys(iconMap).find(key => name.toLocaleLowerCase().includes(key));
  const icon = iconMap[key] ?? 'question_mark';
  const fields:Field[] = fieldsMap[componentKey] ?? [];

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
      const lifeEvent = this.availableLifeEvents.find(suspect => suspect.componentKey === component.key);
      lifeEvent.fields.forEach(field => {
        field.readFrom(component, field);
      });

      return lifeEvent;
    }).filter(Boolean);
  }));
  
  addLifeEvent(lifeEvent: LifeEvent) {
    console.log('adding life evnt',lifeEvent)
    // this.muxs.addComponent.next(lifeEvent.createComponent());
    
    // create a component, update all the fields from the life event, then add
    // here we should iterate through the fields and craete a 
    const component = lifeEvent.createComponent();
    lifeEvent.fields.forEach(field => {
      field.updateTo(component, field);
    });

    this.muxs.addComponent.next(component);
  }

  /**
   * Takes a life event, finds the existing component, and updates based on the field values?
   */
  updateLifeEvent(lifeEvent: LifeEvent) {
    // create a component, update all the fields from the life event, then add
    // here we should iterate through the fields and craete a 
    const component = lifeEvent.createComponent();
    lifeEvent.fields.forEach(field => {
      field.updateTo(component, field);
    });

    this.muxs.addComponent.next(component);
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

function generateDerivativeFields(v: Partial<LifeEvent>): LifeEvent {
  // auto generate derivative fields

  const addHref = createLifeEventsAddTypeRoute(v.componentKey);
  const editHref = createLifeEventsEditTypeRoute(v.componentKey);
  const createFriendlyFieldDescription = () => {
    return lifeEvent.fields.map(field => `${field.name}: ${field.value}`).join(', ');
  };
  const lifeEvent =  {
    ...v,
    addHref,
    editHref,
    createFriendlyFieldDescription,
  } as LifeEvent;

  return lifeEvent;
}
