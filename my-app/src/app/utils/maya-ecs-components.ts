
enum NamedPeriods { 
  StartPeriod = 0,
  SinglePeriod = 1,
  FourPeriods = 4,
  Childhood = 18,
  WorkingYears = 30,
  EndPeriod = 120,
  RetirementPeriod = 30,
}

export enum ComponentKey {
  Cash='Cash',
  CostOfLiving='Cost Of Living',
  Stocks='Stocks',
  SavingsAccount='Savings Account',
  Job='Job',
  Retirement='Retirement',
  Mortgage='Mortgage',
  StudentLoan='StudentLoan',
  AutoLoan='AutoLoan',
  SbaLoan='SbaLoan',
  MyAllocationChoices='MyAllocationChoices',
  ChildCare='ChildCare',
  SeniorCare='SeniorCare',
  Wedding='Wedding',
  School='School',
  Travel='Travel',
  Children='Children',
  Medical='Medical',
  Fertility='Fertility',
  Bereavement='Bereavement',
  RenovationAndRepairs='Renovation and Repairs',
  Inheritance='Inheritance',
  Gifts='Gifts',
  Insurance='Insurance',
  Entrepreneurship='Entrepreneurship',
  FertilityIVF='FertilityIVF',
  FertilityBirth='FertilityBirth',
  
}
export enum ComponentType {
  Value,
  CashFlow,
  AmortizedLoan,
  Milestone,
  Choices,
}

export interface Component {
  key: ComponentKey;
  readonly type: ComponentType;
}

export interface DelayedStartComponent extends Component{
  startPeriod: number;
}

export class DelayedStart implements DelayedStartComponent{
  startPeriod = 0;
  type: ComponentType
  key: ComponentKey;
}

export interface EarlyEndComponent extends Component{
  endPeriod: number;
}

export class EarlyEnd implements EarlyEndComponent{
  endPeriod = NamedPeriods.EndPeriod;
  type: ComponentType
  key: ComponentKey;
}

export interface TimeBoundComponent extends Component, DelayedStartComponent, EarlyEndComponent{
  startPeriod: number;
  endPeriod: number;
}

export class Timebound implements TimeBoundComponent {
  type: ComponentType
  key: ComponentKey;
  startPeriod = NamedPeriods.StartPeriod;
  endPeriod = NamedPeriods.EndPeriod;
}

export interface ValueComponent extends Component{
  value: number;
}

export class Cash implements ValueComponent {
  key = ComponentKey.Cash;
  type = ComponentType.Value;
  constructor(public value) {}
}

export class Stocks implements ValueComponent {
  key = ComponentKey.Stocks;
  type = ComponentType.Value;
  constructor(public value, public annualReturns: number[]) {}
}

export class SavingsAccount implements ValueComponent, DelayedStartComponent {
  key = ComponentKey.SavingsAccount;
  type = ComponentType.Value;
  startPeriod = NamedPeriods.StartPeriod;
  constructor(public value, public interestRates:number[]) {}
}

export interface CashFlowComponent extends DelayedStartComponent{
  cashFlow: number;
  periods: number;
}

export class CashFlow implements CashFlowComponent {
  key: ComponentKey;
  type = ComponentType.CashFlow;
  startPeriod = NamedPeriods.StartPeriod;
  
  constructor(public cashFlow, public periods: number = NamedPeriods.SinglePeriod) {
  }
}

export class ChildCare extends CashFlow {
  key= ComponentKey.ChildCare;
  periods = NamedPeriods.Childhood;
  
  constructor() {
  // bard: average cash flow cost of child care for an individual annually in america
    super(-12e3, NamedPeriods.Childhood);
  }
}

export class SeniorCare extends CashFlow {
  key= ComponentKey.SeniorCare;
  periods = NamedPeriods.EndPeriod;
  constructor() {
    // bard: average cash flow cost of senior care for an individual in america
    super(-80e3, NamedPeriods.RetirementPeriod);
  }
}


export class Travel extends CashFlow {
  key= ComponentKey.Travel;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of travel annual for an individual in america
    super(-5e3, 1);
  }
}

export class Wedding extends CashFlow {
  key= ComponentKey.Wedding;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of wedding in america
    super(-30e3, 1);
  }
}

export class School extends CashFlow {
  key= ComponentKey.School;
  periods = NamedPeriods.FourPeriods;
  constructor() {
    // bard: average cash flow cost of school in america
    super(-40e3, NamedPeriods.FourPeriods);
  }
}
export class Children extends CashFlow {
  key= ComponentKey.Children;
  periods = NamedPeriods.Childhood;
  constructor() {
    // bard: average cash flow cost of children in america
    super(-15e3, 1);
  }
}


export class Medical extends CashFlow {
  key= ComponentKey.Medical;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: median cash flow cost of emergency medical procedure for an individual annually in america
    super(-12e3, 1);
  }
}


export class FertilityIVF extends CashFlow {
  key= ComponentKey.FertilityIVF;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of fertility IVF or birth in america
    super(-30e3, 1);
  }
}


export class FertilityBirth extends CashFlow {
  key= ComponentKey.FertilityBirth;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of fertility IVF or birth in america
    super(-20e3, 1);
  }
}
export class Fertility extends CashFlow {
  key= ComponentKey.Fertility;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of bereavement in america
    super(-25e3, 1);
  }
}
export class Bereavement extends CashFlow {
  key= ComponentKey.Bereavement;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of bereavement in america
    super(-20e3, 1);
  }
}
export class RenovationAndRepairs extends CashFlow {
  key= ComponentKey.RenovationAndRepairs;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of Renovation And Repairs in america
    super(-20e3, 1);
  }
}

export class Inheritance extends CashFlow {
  key= ComponentKey.Inheritance;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow gain of inheritance in america
    super(180e3, 1);
  }
}

export class Gifts extends CashFlow {
  key= ComponentKey.Gifts;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of gifts in america
    super(-1e3, 1);
  }
}
export class Insurance extends CashFlow {
  key= ComponentKey.Insurance;
  periods = NamedPeriods.WorkingYears;
  constructor() {
    // bard: average cash flow cost of insurance in america
    super(-10e3, 1);
  }
}
export class Entrepreneurship extends CashFlow {
  key= ComponentKey.Entrepreneurship;
  periods = NamedPeriods.SinglePeriod;
  constructor() {
    // bard: average cash flow cost of entreprenurship in america
    super(-40e3, 1);
  }
}

export class Job extends CashFlow implements TimeBoundComponent{
  key = ComponentKey.Job;
  startPeriod = NamedPeriods.StartPeriod;
  endPeriod = NamedPeriods.EndPeriod;
}


export class CostOfLiving extends CashFlow{
  key = ComponentKey.CostOfLiving;
}

interface MilestoneComponent extends Component{
  period: number;
}

class Milestone {
  type = ComponentType.Milestone;
}

export class Retirement extends Milestone implements MilestoneComponent{
  key = ComponentKey.Retirement;
  constructor(public period) {
    super();
  }
}

export interface AmortizedLoanComponent extends DelayedStartComponent{
  principal: number;
  interestRate: number;
  monthlyPayment: number;
}

export class AmortizedLoan implements AmortizedLoanComponent{
  type = ComponentType.AmortizedLoan;
  key: ComponentKey;
  startPeriod = 0;
  constructor(public principal, public interestRate, public monthlyPayment) {}
}

export class Mortgage extends AmortizedLoan{
  key = ComponentKey.Mortgage;
}

export class StudentLoan extends AmortizedLoan{
  key = ComponentKey.StudentLoan;
}

export class AutoLoan extends AmortizedLoan {
  key = ComponentKey.AutoLoan;
}

export class SbaLoan extends AmortizedLoan {
  key = ComponentKey.SbaLoan;
}


interface ChoicesComponent extends DelayedStartComponent{
}

class Choices implements ChoicesComponent{
  type = ComponentType.Choices;
  key: ComponentKey;
  startPeriod = 0;
}

export class MyAllocationChoices extends Choices {
  key = ComponentKey.MyAllocationChoices;
}