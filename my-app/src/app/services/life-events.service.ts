import { Injectable } from '@angular/core';
import { createLifeEventsAddTypeRoute, createLifeEventsEditTypeRoute } from '../utils/route_mapper';
import { MayaUserExperienceService } from './maya-user-experience.service';
import { AmortizedLoan, AutoLoan, Cash, ChildCare, Component, ComponentKey, CostOfLiving, DelayedStartComponent, Job, Mortgage, Retirement, SavingsAccount, SbaLoan, Stocks, StudentLoan, TimeBoundComponent } from '../utils/maya-ecs-components';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Field {
  name: string;
  value: string|number;
  readFrom: (component: Component, field: Field) => void;
  updateTo: (component: Component, field: Field) => void;
}

export interface Calculator {
  title: string;
  href: string;
  description: string;
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
  calculators: Calculator[];
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

function createStartPeriodFields():Field[] {
  return [
    {
      name: 'Start Period',
      value: '0',
      readFrom: (component: DelayedStartComponent, field: Field) => {
        field.value = component.startPeriod;
      },
      updateTo: (component: DelayedStartComponent, field: Field) => {
        component.startPeriod = Number(field.value) || 0;
      }
    },
  ];
}

function createTimeboundFields(): Field[] {
 return [
  {
    name: 'Start Period',
    value: '0',
    readFrom: (component: TimeBoundComponent, field: Field) => {
      field.value = component.startPeriod;
    },
    updateTo: (component: TimeBoundComponent, field: Field) => {
      component.startPeriod = Number(field.value) || 0;
    }
  },
  {
    name: 'End Period',
    value: '120',
    readFrom: (component: TimeBoundComponent, field: Field) => {
      field.value = component.startPeriod;
    },
    updateTo: (component: TimeBoundComponent, field: Field) => {
      component.startPeriod = Number(field.value) || 0;
    }
  },
];
}


function addAmortizedLoanFields():Field[] {
  const amortizedLoanFields: Field[] = [
    ...createStartPeriodFields(),
    {
      name: 'Principal',
      value: '268000',
      readFrom: (component: AmortizedLoan, field: Field) => {
        field.value = component.principal;
      },
      updateTo: (component: AmortizedLoan, field: Field) => {
        component.principal = Number(field.value) || 0;
      }
    },
    {
      name: 'Interest Rate',
      value: '.0696',
      readFrom: (component: AmortizedLoan, field: Field) => {
        field.value = component.interestRate;
      },
      updateTo: (component: AmortizedLoan, field: Field) => {
        component.interestRate = Number(field.value) || 0;
      }
    },
    {
      name: 'Monthly Payment',
      value: '1776',
      readFrom: (component: AmortizedLoan, field: Field) => {
        field.value = component.monthlyPayment;
      },
      updateTo: (component: AmortizedLoan, field: Field) => {
        component.monthlyPayment = Number(field.value) || 0;
      }
    },
  ];
  return amortizedLoanFields;
}


const fieldsMap = {
  'Cash': [
    {
      name: 'Balance',
      value: '0',
      readFrom: (cash: Cash, field: Field) => {
        field.value = cash.value;
      },
      updateTo: (cash: Cash, field: Field) => {
        cash.value = Number(field.value) || 0;
      }
    },
  ],

  'Cost Of Living': [
    {
      name: 'Annual Expenses',
      value: '0',
      readFrom: (component: CostOfLiving, field: Field) => {
        field.value = component.cashFlow;
      },
      updateTo: (component: CostOfLiving, field: Field) => {
        component.cashFlow = Number(field.value) || 0;
      }
    },
  ],

  'Stocks': [
    {
      name: 'Market Value',
      value: '0',
      readFrom: (component: Stocks, field: Field) => {
        field.value = component.value;
      },
      updateTo: (component: Stocks, field: Field) => {
        component.value = Number(field.value) || 0;
      }
    },
    {
      name: 'Annual Returns',
      value: '0',
      readFrom: (component: Stocks, field: Field) => {
        field.value = component.annualReturns.join(', ');
      },
      updateTo: (component: Stocks, field: Field) => {
        const annualReturns = `${field.value}`.split(',').map(v => v.trim()).map(Number).filter(v => !isNaN(v));;
        component.annualReturns = annualReturns;
      }
    },
  ],

  'Savings Account': [
    {
      name: 'Balance',
      value: '0',
      readFrom: (component: SavingsAccount, field: Field) => {
        field.value = component.value;
      },
      updateTo: (component: SavingsAccount, field: Field) => {
        component.value = Number(field.value) || 0;
      }
    },
    {
      name: 'Interest Rate',
      value: '0',
      readFrom: (component: SavingsAccount, field: Field) => {
        field.value = component.interestRates.join(', ');
      },
      updateTo: (component: SavingsAccount, field: Field) => {
        const value = `${field.value}`.split(',').map(v => v.trim()).map(Number).filter(v => !isNaN(v));

        component.interestRates = value;
      }
    },
    ...createTimeboundFields(),
  ],

  'Job': [
    {
      name: 'Annual Savings after Income',
      value: '0',
      readFrom: (component: Job, field: Field) => {
        field.value = component.cashFlow;
      },
      updateTo: (component: Job, field: Field) => {
        component.cashFlow = Number(field.value) || 0;
      }
    },
    ...createTimeboundFields(),
  ],


  'Retirement': [
    {
      name: 'Years until retirement',
      value: '0',
      readFrom: (component: Retirement, field: Field) => {
        field.value = component.period;
      },
      updateTo: (component: Retirement, field: Field) => {
        component.period = Number(field.value) || 0;
      }
    },
  ],

  'Mortgage': [...addAmortizedLoanFields()] as Field[],
  'StudentLoan': [...addAmortizedLoanFields()] as Field[],
  'AutoLoan': [...addAmortizedLoanFields()] as Field[],
  'SbaLoan': [...addAmortizedLoanFields()] as Field[],



  'Child Care': [
    
    {
      name: 'Annual spend on child',
      value: '15000',
      readFrom: (component: ChildCare, field: Field) => {
        field.value = component.cashFlow;
      },
      updateTo: (component: ChildCare, field: Field) => {
        component.cashFlow = Number(field.value) || 0;
      }
    },
    ...createStartPeriodFields()
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

const shorthand: Array<[string, ComponentKey, () => Component]> = [
  ['Cash', ComponentKey.Cash, () => new Cash(5e3)],
  ['Cost of Living', ComponentKey.CostOfLiving, () => new CostOfLiving(5e4)],
  ['Stocks', ComponentKey.Stocks, () => new Stocks(4e5, [...new Array(4).fill(1.1), .75])],
  ['Savings Account', ComponentKey.SavingsAccount, () => new SavingsAccount(5e4, [.01, .05])],
  ['Job', ComponentKey.Job, () => new Job(1e5, 10)],
  ['Retirement', ComponentKey.Retirement, () => new Retirement(15)],
  ['Mortgage', ComponentKey.Mortgage, () => new Mortgage(2.7e5, .07, 1800)],
  ['Student Loan', ComponentKey.StudentLoan, () => new StudentLoan(5.5e4, .07, 640)],
  ['Auto Loan', ComponentKey.AutoLoan, () => new AutoLoan(2.6e4, .06, 610)],
  ['SBA Loan', ComponentKey.SbaLoan, () => new SbaLoan(7.92e5, .02875, 3286)],
  ['Child Care', ComponentKey.ChildCare, () => new ChildCare(15e3)],
  ['Senior Care', ComponentKey.SeniorCare, () => new CostOfLiving(90e3)],
];

const availableLifeEvents = shorthand.map(([name, componentKey, createComponent,]) => {
  const key = Object.keys(iconMap).find(key => name.toLocaleLowerCase().includes(key));
  const icon = iconMap[key] ?? 'question_mark';
  const fields: Field[] = fieldsMap[componentKey] ?? [];

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

  selectedLifeEvents: Observable<LifeEvent[]> = this.muxs.components.pipe(map(components => {

    return Array.from(components.values()).map(component => {
      const lifeEvent = this.availableLifeEvents.find(suspect => suspect.componentKey === component.key);
      lifeEvent.fields.forEach(field => {
        field.readFrom(component, field);
      });

      return lifeEvent;
    }).filter(Boolean);
  }));

  addLifeEvent(lifeEvent: LifeEvent) {
    console.log('adding life evnt', lifeEvent)
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
    private muxs: MayaUserExperienceService,
  ) { }
}

function generateDerivativeFields(v: Partial<LifeEvent>): LifeEvent {
  // auto generate derivative fields

  const addHref = createLifeEventsAddTypeRoute(v.componentKey);
  const editHref = createLifeEventsEditTypeRoute(v.componentKey);
  const createFriendlyFieldDescription = () => {
    return lifeEvent.fields.map(field => `${field.name}: ${field.value}`).join(', ');
  };
  const lifeEvent = {
    ...v,
    addHref,
    editHref,
    createFriendlyFieldDescription,
  } as LifeEvent;

  return lifeEvent;
}
