
import { AmortizedLoan, AnniversaryCelebration, AutoLoan, Bereavement, BigTrip, BirthdayCelebration, Cash, CashFlow, CashFlowComponent, ChildCare, Children, CommercialRealEstate, Component, ComponentKey, ComponentType, Contribution, CostOfLiving, DelayedStartComponent, Entrepreneurship, FancyCar, Fertility, FertilityBirth, FertilityIVF, FineDining, FixedAllocation, FixedAllocationComponent, FixedStocksAllocation, Gifts, Inheritance, Insurance, Job, KidCollegeTuition, KidsCollegeFund, LongVacation, Medical, Mortgage, NiceBigHouse, PolynomialAllocation, PolynomialAllocationComponent, PolynomialStocksAllocation, PropertyTax, RenovationAndRepairs, Rental, RentalIncome, ResidentialRealEstate, Retirement, RetirementSpend, Sabbatical, SavingsAccount, SbaLoan, School, SeniorCare, SocialSecurityIncome, Stocks, StudentLoan, Traditional401k, Traditional401kContribution, Travel, Value, VolatileAsset, Wedding } from '../utils/maya-ecs-components';
import { Field, LifeEvent } from '../utils/life-event-utils';
import { createLifeEventsAddTypeRoute, createLoanTypeRoute, createPolynomialTypeRoute } from '../utils/route_mapper';

/** This may be better to reverse, icon as key and tags as matches */
const iconMap = {
  Car: 'directions_car',
  'Fancy Car': 'directions_car',
  Housing: 'home',
  'SeniorCare': 'home',
  Travel: 'flight_takeoff',
  Wedding: 'favorite',
  School: 'school',
  Children: 'child_care',
  ChildCare: 'child_care',
  Medical: 'medical_services',
  Fertility: 'baby_changing_station',
  'Fertility IVF': 'baby_changing_station',
  'Fertility Birth': 'baby_changing_station',
  Insurance: 'restore_page',
  Gifts: 'redeem',
  Inheritance: 'next_plan',
  Entrepreneurship: 'work',
  Cash: 'local_atm',
  Savings: 'account_balance',
  Job: 'work',
  Investment: 'trending_up',
  'Renovation And Repairs': 'construction',
  'Student Loan': 'school',
  'Kids College Fund': 'school',
  'Kid College Tuition': 'school',
  Stocks: 'ssid_chart',
  'Auto Loan': 'car_crash',
  Mortgage: 'home',
  Retirement: 'elderly',
  'Social Security Income': 'elderly',
  'Cost Of Living': 'living',
  'SbaLoan': 'credit_score',
  'HOA': 'add_business',
  'PropertyTax' : 'home_work',
  'Rental': 'apartment',
  'RentalIncome': 'domain_add',
  'Fixed Stocks Allocation': 'balance',
  'Polynomial Stocks Allocation': 'balance',
  'Nice Big House': 'villa',
  'Retirement Spend': 'holiday_village'
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


function createFixedAllocationFields():Field[] {
  return [
    {
      name: 'Proportion of Assets',
      value: '0',
      readFrom: (component: FixedAllocationComponent, field: Field) => {
        field.value = component.percentage;
      },
      updateTo: (component: FixedAllocationComponent, field: Field) => {
        component.percentage = Number(field.value) || 0;
      }
    },
    {
      name: 'Start Period',
      value: '0',
      readFrom: (component: FixedAllocationComponent, field: Field) => {
        field.value = component.startPeriod;
      },
      updateTo: (component: FixedAllocationComponent, field: Field) => {
        component.startPeriod = Number(field.value) || 0;
      }
    },
    {
      name: 'Periods',
      value: '1',
      readFrom: (component: FixedAllocationComponent, field: Field) => {
        field.value = component.periods;
      },
      updateTo: (component: FixedAllocationComponent, field: Field) => {
        component.periods = Number(field.value) || 0;
      }
    },
  ];
}

function createPolynomialAllocationFields():Field[] {
  return [
    {
      name: 'Exponential Factor',
      value: '0',
      readFrom: (component: PolynomialAllocationComponent, field: Field) => {
        field.value = component.exponentialFactor;
      },
      updateTo: (component: PolynomialAllocationComponent, field: Field) => {
        component.exponentialFactor = Number(field.value) || 0;
      }
    },
    {
      name: 'Linear Factor',
      value: '0',
      readFrom: (component: PolynomialAllocationComponent, field: Field) => {
        field.value = component.linearFactor;
      },
      updateTo: (component: PolynomialAllocationComponent, field: Field) => {
        component.linearFactor = Number(field.value) || 0;
      }
    },
    {
      name: 'Constant',
      value: '0',
      readFrom: (component: PolynomialAllocationComponent, field: Field) => {
        field.value = component.constant;
      },
      updateTo: (component: PolynomialAllocationComponent, field: Field) => {
        component.constant = Number(field.value) || 0;
      }
    },
    {
      name: 'Start Period',
      value: '0',
      readFrom: (component: PolynomialAllocationComponent, field: Field) => {
        field.value = component.startPeriod;
      },
      updateTo: (component: PolynomialAllocationComponent, field: Field) => {
        component.startPeriod = Number(field.value) || 0;
      }
    },
    {
      name: 'Periods',
      value: '1',
      readFrom: (component: PolynomialAllocationComponent, field: Field) => {
        field.value = component.periods;
      },
      updateTo: (component: PolynomialAllocationComponent, field: Field) => {
        component.periods = Number(field.value) || 0;
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
        field.value = component.contribution;
      },
      updateTo: (component: CashFlowComponent, field: Field) => {
        component.contribution = Number(field.value) || 0;
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
  'Traditional401k': [
    ...createVolatileAssetFields(),
  ],
  'Stocks': [
    ...createVolatileAssetFields(),
  ],
  'ResidentialRealEstate': [
    ...createVolatileAssetFields(),
  ],
  'CommercialRealEstate': [
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
        field.value = component.contribution;
      },
      updateTo: (component: ChildCare, field: Field) => {
        component.contribution = Number(field.value) || 0;
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
  'Traditional401kContribution': [
    ...createCashFlowFields(),
  ],
  'BigTrip': [
    ...createCashFlowFields(),
  ],
  'LongVacation': [
    ...createCashFlowFields(),
  ],
  'Sabbatical': [
    ...createCashFlowFields(),
  ],
  'FineDining': [
    ...createCashFlowFields(),
  ],
  'BirthdayCelebration': [
    ...createCashFlowFields(),
  ],
  'AnniversaryCelebration': [
    ...createCashFlowFields(),
  ],
  'Fixed Stocks Allocation': [
    ...createFixedAllocationFields(),
  ],
  'Polynomial Stocks Allocation': [
    ...createPolynomialAllocationFields(),
  ],
  
};

const shorthand: Array<[string, ComponentKey, () => Component]> = [
  ['Cash', ComponentKey.Cash, () => new Cash(5e3)],
  ['Cost of Living', ComponentKey.CostOfLiving, () => new CostOfLiving()],
  ['Retirement Spend', ComponentKey.RetirementSpend, () => new RetirementSpend()],
  ['Job', ComponentKey.Job, () => new Job()],
  ['Traditional 401k', ComponentKey.Traditional401k, () => new Traditional401k(20e3, [...new Array(4).fill(1.1), .75])],
  ['Traditional 401k Contribution', ComponentKey.Traditional401kContribution, () => new Traditional401kContribution(20e3, 30)],
  ['Stocks', ComponentKey.Stocks, () => new Stocks(4e5, [...new Array(4).fill(1.1), .75])],
  ['Fixed Stocks Allocation', ComponentKey.FixedStocksAllocation, () => new FixedStocksAllocation(0)],
  ['Polynomial Stocks Allocation', ComponentKey.PolynomialStocksAllocation, () => new PolynomialStocksAllocation(0,0,1)],
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
  ['Big Trip', ComponentKey.BigTrip, () => new BigTrip()],
  ['Long Vacation', ComponentKey.LongVacation, () => new LongVacation()],
  ['Sabbatical', ComponentKey.Sabbatical, () => new Sabbatical()],
  ['Fine Dining', ComponentKey.FineDining, () => new FineDining()],
  ['Birthday Celebration', ComponentKey.BirthdayCelebration, () => new BirthdayCelebration()],
  ['Anniversary Celebration', ComponentKey.AnniversaryCelebration, () => new AnniversaryCelebration()],
  ['Residential Real Estate', ComponentKey.ResidentialRealEstate, () => new ResidentialRealEstate(500e3, [1.04,1.04,1.04,1.04,1.04,.85])],
  ['Commercial Real Estate', ComponentKey.CommercialRealEstate, () => new CommercialRealEstate(1e6, [1.04,1.04,1.04,1.04,1.04,.85])],
  // ['Retirement', ComponentKey.Retirement, () => new Retirement(15)],
  
];

export const availableLifeEvents:LifeEvent[] = shorthand.map(([name,IGNORE, createComponent,]) => {
  const componentPrototype = createComponent();
  const componentKey = componentPrototype.key;
  const componentType = componentPrototype.type;

  const icon = iconMap[componentKey] ?? 'question_mark';
  const fields: Field[] = fieldsMap[componentKey] ?? [];
  const optional = ![
    ComponentKey.Cash, ComponentKey.Cash
  ].includes(componentKey);

  const addHref = createAddEditHref(componentType, componentKey);
  const editHref = createAddEditHref(componentType, componentKey);

  const createFriendlyFieldDescription = () => {
    return fields.map(field => `${field.name}: ${field.value}`).join(', ');
  };

  const createSupplementary = () => {
    return '';
  };

  return {
    name,
    icon,
    createComponent,
    fields,
    optional,
    componentKey,
    componentType,
    addHref,
    editHref,
    createFriendlyFieldDescription,
    createSupplementary,
    calculators: [],
  };
});


function createAddEditHref(componentType: ComponentType, componentKey: ComponentKey) {
  return componentType === ComponentType.AmortizedLoan ? createLoanTypeRoute(componentKey) :
    componentType === ComponentType.PolynomialAllocation ? createPolynomialTypeRoute(componentKey) :
    createLifeEventsAddTypeRoute(componentKey); 
}


export function createHighlightNumber(componentType: ComponentType, componentKey: ComponentKey, component: Component ) {
  switch(componentType){
    case ComponentType.Contribution:
      return createContributionHighlight(component as Contribution);
    case ComponentType.VolatileAsset:
      return createVolatileAssetHighlight(component as VolatileAsset);
    case ComponentType.AmortizedLoan:
      return createAmortizedLoanHighlight(component as AmortizedLoan);
    case ComponentType.Value:
      return createValueHighlight(component as Value);
    case ComponentType.FixedAllocation:
      return createFixedAllocationHighlight(component as FixedAllocation);
    case ComponentType.PolynomialAllocation:
      return createPolynomialAllocationHighlight(component as PolynomialAllocation);
    default:
      return;
      
  }
}

export function createFixedAllocationHighlight(component: FixedAllocation):string {
  return component.percentage;
}
export function createPolynomialAllocationHighlight(component: PolynomialAllocation):string {
  return `${component.exponentialFactor}p^2 + ${component.linearFactor}p + ${component.constant}`
}
export function createValueHighlight(component: Value):string {
  return `${component.value}`;
}
export function createContributionHighlight(component: Contribution):string {
  return `${component.contribution}`;
}
export function createVolatileAssetHighlight(component: VolatileAsset):string {
  return `${component.value}`;
}
export function createAmortizedLoanHighlight(component: AmortizedLoan):string {
  return `${component.principal}`;
}