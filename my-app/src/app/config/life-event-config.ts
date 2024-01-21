
import { AmortizedLoan, AutoLoan, Bereavement, Cash, CashFlowComponent, ChildCare, Children, Component, ComponentKey, CostOfLiving, DelayedStartComponent, Entrepreneurship, FancyCar, Fertility, FertilityBirth, FertilityIVF, Gifts, Inheritance, Insurance, Job, KidCollegeTuition, KidsCollegeFund, Medical, Mortgage, NiceBigHouse, PropertyTax, RenovationAndRepairs, Rental, RentalIncome, Retirement, RetirementSpend, SavingsAccount, SbaLoan, School, SeniorCare, SocialSecurityIncome, Stocks, StudentLoan, TimeBoundComponent, Traditional401k, Traditional401kContribution, Travel, VolatileAsset, Wedding } from '../utils/maya-ecs-components';
import { Field } from '../utils/life-event-utils';

/** This may be better to reverse, icon as key and tags as matches */
const iconMap = {
  Car: 'directions_car',
  FancyCar: 'directions_car',
  Housing: 'home',
  SeniorCare: 'home',
  Travel: 'flight_takeoff',
  Wedding: 'favorite',
  School: 'school',
  Children: 'child_care',
  ChildCare: 'child_care',
  Medical: 'medical_services',
  Fertility: 'baby_changing_station',
  FertilityIVF: 'baby_changing_station',
  FertilityBirth: 'baby_changing_station',
  Insurance: 'restore_page',
  Gifts: 'redeem',
  Inheritance: 'next_plan',
  Entrepreneurship: 'work',
  Cash: 'local_atm',
  Savings: 'account_balance',
  Job: 'work',
  Investment: 'trending_up',
  RenovationAndRepairs: 'construction',
  StudentLoan: 'school',
  KidsCollegeFund: 'school',
  KidCollegeTuition: 'school',
  Stock: 'ssid_chart',
  AutoLoan: 'car_crash',
  Mortgage: 'home',
  Retirement: 'elderly',
  SocialSecurityIncome: 'elderly',
  'cost of living': 'living',
  'SbaLoan': 'credit_score',
  'HOA': 'add_business',
  'PropertyTax' : 'home_work',
  'Rental': 'apartment',
  'RentalIncome': 'domain_add',
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
      field.value = component.endPeriod;
    },
    updateTo: (component: TimeBoundComponent, field: Field) => {
      component.endPeriod = Number(field.value) || 0;
    }
  },
];
}

function createCashFlowFields(): Field[] {
  return [
    {
      name: 'Annual Cash Flow',
      value: '0',
      readFrom: (component: CashFlowComponent, field: Field) => {
        field.value = component.cashFlow;
      },
      updateTo: (component: CashFlowComponent, field: Field) => {
        component.cashFlow = Number(field.value) || 0;
      }
    },
    {
      name: 'Start Period',
      value: '0',
      readFrom: (component: CashFlowComponent, field: Field) => {
        field.value = component.startPeriod;
      },
      updateTo: (component: CashFlowComponent, field: Field) => {
        component.startPeriod = Number(field.value) || 0;
      }
    },
    {
      name: 'Periods',
      value: '1',
      readFrom: (component: CashFlowComponent, field: Field) => {
        field.value = component.periods;
      },
      updateTo: (component: CashFlowComponent, field: Field) => {
        component.periods = Number(field.value) || 0;
      }
    },
  ];
}

function createVolatileAssetFields():Field[] {
  const fields:Field[] = [
    {
      name: 'Market Value',
      value: '0',
      readFrom: (component: VolatileAsset, field: Field) => {
        field.value = component.value;
      },
      updateTo: (component: VolatileAsset, field: Field) => {
        component.value = Number(field.value) || 0;
      }
    },
    {
      name: 'Annual Returns',
      value: '0',
      readFrom: (component: VolatileAsset, field: Field) => {
        field.value = component.annualMultiplier.join(', ');
      },
      updateTo: (component: VolatileAsset, field: Field) => {
        const annualReturns = `${field.value}`.split(',').map(v => v.trim()).map(Number).filter(v => !isNaN(v));;
        component.annualMultiplier = annualReturns;
      }
    },
  ];

  return fields;
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
    ...createCashFlowFields(),
  ],

  'Stocks': [
    ...createVolatileAssetFields(),
  ],
  'Traditional401k': [
    ...createVolatileAssetFields(),
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
        field.value = component.annualMultiplier.join(', ');
      },
      updateTo: (component: SavingsAccount, field: Field) => {
        const value = `${field.value}`.split(',').map(v => v.trim()).map(Number).filter(v => !isNaN(v));

        component.annualMultiplier = value;
      }
    },
  ],

  'Job': [
    ...createCashFlowFields(),
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
  'Senior Care': [
    ...createCashFlowFields(),
  ],
  'Travel': [
    ...createCashFlowFields(),
  ],
  'Wedding': [
    ...createCashFlowFields(),
  ],
  'School': [
    ...createCashFlowFields(),
  ],
  'Children': [
    ...createCashFlowFields(),
  ],
  'Medical': [
    ...createCashFlowFields(),
  ],
  'Fertility': [
    ...createCashFlowFields(),
  ],
  'Fertility (IVF)': [
    ...createCashFlowFields(),
  ],
  'Fertility (Birth)': [
    ...createCashFlowFields(),
  ],
  'Bereavement': [
    ...createCashFlowFields(),
  ],
  'Renovation and Repairs': [
    ...createCashFlowFields(),
  ],
  'Inheritance': [
    ...createCashFlowFields(),
  ],
  'Gifts': [
    ...createCashFlowFields(),
  ],
  'Insurance': [
    ...createCashFlowFields(),
  ],
  'Entrepreneurship': [
    ...createCashFlowFields(),
  ],
  'Rental': [
    ...createCashFlowFields(),
  ],
  'HOA': [
    ...createCashFlowFields(),
  ],
  'PropertyTax': [
    ...createCashFlowFields(),
  ],
  'RentalIncome': [
    ...createCashFlowFields(),
  ],
  'FancyCar': [
    ...createCashFlowFields(),
  ],
  'NiceBigHouse': [
    ...createCashFlowFields(),
  ],
  'KidCollegeTuition': [
    ...createCashFlowFields(),
  ],
  'KidCollegeFund': [
    ...createCashFlowFields(),
  ],
  'SocialSecurityIncome': [
    ...createCashFlowFields(),
  ],
  'RetirementSpend': [
    ...createCashFlowFields(),
  ],
  
};

const shorthand: Array<[string, ComponentKey, () => Component]> = [
  ['Starting Cash', ComponentKey.Cash, () => new Cash(5e3)],
  ['Cost of Living', ComponentKey.CostOfLiving, () => new CostOfLiving()],
  ['Retirement Spend', ComponentKey.RetirementSpend, () => new RetirementSpend()],
  ['Job', ComponentKey.Job, () => new Job()],
  ['Traditional 401k', ComponentKey.Traditional401k, () => new Traditional401k(4e5, [...new Array(4).fill(1.1), .75])],
  // ['Traditional 401k Contribution', ComponentKey.Traditional401kContribution, () => new Traditional401kContribution(4e5, 30)],
  ['Stocks', ComponentKey.Stocks, () => new Stocks(4e5, [...new Array(4).fill(1.1), .75])],
  ['Fancy Car', ComponentKey.FancyCar, () => new FancyCar()],
  ['Nice Big House', ComponentKey.NiceBigHouse, () => new NiceBigHouse()],
  ['Kids College Tuition', ComponentKey.KidCollegeTuition, () => new KidCollegeTuition()],
  ['Savings Account', ComponentKey.SavingsAccount, () => new SavingsAccount(5e4, [1.01, 1.05])],
  ['Mortgage', ComponentKey.Mortgage, () => new Mortgage(2.7e5, .07, 1800)],
  ['Student Loan', ComponentKey.StudentLoan, () => new StudentLoan(5.5e4, .07, 640)],
  ['Auto Loan', ComponentKey.AutoLoan, () => new AutoLoan(2.6e4, .06, 610)],
  ['Social Security Income', ComponentKey.SocialSecurityIncome, () => new SocialSecurityIncome()],
  ['Child Care', ComponentKey.ChildCare, () => new ChildCare()],
  ['Senior Care', ComponentKey.SeniorCare, () => new SeniorCare()],
  ['Travel', ComponentKey.Travel, () => new Travel()],
  ['Wedding', ComponentKey.Wedding, () => new Wedding()],
  ['School', ComponentKey.School, () => new School()],
  ['Children', ComponentKey.Children, () => new Children()],
  ['Medical', ComponentKey.Medical, () => new Medical()],
  ['SBA Loan', ComponentKey.SbaLoan, () => new SbaLoan(7.92e5, .02875, 3286)],
  ['Fertility (General)', ComponentKey.Fertility, () => new Fertility()],
  ['Fertility (IVF)', ComponentKey.FertilityIVF, () => new FertilityIVF()],
  ['Fertility (Birth)', ComponentKey.FertilityBirth, () => new FertilityBirth()],
  ['Bereavement', ComponentKey.Bereavement, () => new Bereavement()],
  ['Renovation and Repairs', ComponentKey.RenovationAndRepairs, () => new RenovationAndRepairs()],
  ['Inheritance', ComponentKey.Inheritance, () => new Inheritance()],
  ['Gifts', ComponentKey.Gifts, () => new Gifts()],
  ['Insurance', ComponentKey.Insurance, () => new Insurance()],
  ['Entrepreneurship', ComponentKey.Entrepreneurship, () => new Entrepreneurship()],
  ['Rental', ComponentKey.Rental, () => new Rental()],
  ['HOA', ComponentKey.HOA, () => new Entrepreneurship()],
  ['PropertyTax', ComponentKey.PropertyTax, () => new PropertyTax()],
  ['Kids College Fund', ComponentKey.KidsCollegeFund, () => new KidsCollegeFund()],
  ['Rental Income', ComponentKey.RentalIncome, () => new RentalIncome()],
  ['Retirement', ComponentKey.Retirement, () => new Retirement(15)],
  
];

export const availableLifeEvents = shorthand.map(([name, componentKey, createComponent,]) => {
  const icon = iconMap[componentKey] ?? 'question_mark';
  const fields: Field[] = fieldsMap[componentKey] ?? [];
  const optional = ![
    ComponentKey.Cash, ComponentKey.Cash
  ].includes(componentKey);

  return {
    name,
    icon,
    createComponent,
    fields,
    optional,
    componentKey,
  };
});