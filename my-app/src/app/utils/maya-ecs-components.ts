
enum NamedPeriods { 
  StartPeriod = 0,
  SinglePeriod = 1,
  FourPeriods = 4,
  Childhood = 18,
  WorkingYears = 30,
  Adulthood = 60,
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
  Rental='Rental',
  HOA='HOA',
  PropertyTax='PropertyTax',
  RentalIncome='RentalIncome',
  KidCollegeTuition='KidCollegeTuition',
  KidsCollegeFund='KidsCollegeFund',
  NiceBigHouse='NiceBigHouse',
  FancyCar='FancyCar',
  SocialSecurityIncome='SocialSecurityIncome',
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
  
  constructor() {
  // bard: average cash flow cost of child care for an individual annually in america
    super(-12e3, NamedPeriods.Childhood);
  }
}

export class SeniorCare extends CashFlow {
  key= ComponentKey.SeniorCare;
  constructor() {
    // bard: average cash flow cost of senior care for an individual in america
    super(-80e3, NamedPeriods.RetirementPeriod);
  }
}


export class SocialSecurityIncome extends CashFlow {
  key= ComponentKey.SocialSecurityIncome;
  constructor() {
    super(12e3, NamedPeriods.RetirementPeriod);
  }
}

export class Travel extends CashFlow {
  key= ComponentKey.Travel;
  constructor() {
    // bard: average cash flow cost of travel annual for an individual in america
    super(-5e3, NamedPeriods.SinglePeriod);
  }
}

export class Wedding extends CashFlow {
  key= ComponentKey.Wedding;
  constructor() {
    // bard: average cash flow cost of wedding in america
    super(-30e3, NamedPeriods.SinglePeriod);
  }
}

export class School extends CashFlow {
  key= ComponentKey.School;
  constructor() {
    // bard: average cash flow cost of school in america
    super(-40e3, NamedPeriods.FourPeriods);
  }
}
export class Children extends CashFlow {
  key= ComponentKey.Children;
  constructor() {
    // bard: average cash flow cost of children in america
    super(-15e3, NamedPeriods.Childhood);
  }
}

export class Medical extends CashFlow {
  key= ComponentKey.Medical;
  constructor() {
    // bard: median cash flow cost of emergency medical procedure for an individual annually in america
    super(-12e3, NamedPeriods.SinglePeriod);
  }
}

export class FertilityIVF extends CashFlow {
  key= ComponentKey.FertilityIVF;
  constructor() {
    // bard: average cash flow cost of fertility IVF or birth in america
    super(-30e3, NamedPeriods.SinglePeriod);
  }
}

export class FertilityBirth extends CashFlow {
  key= ComponentKey.FertilityBirth;
  constructor() {
    // bard: average cash flow cost of fertility IVF or birth in america
    super(-20e3, NamedPeriods.SinglePeriod);
  }
}
export class Fertility extends CashFlow {
  key= ComponentKey.Fertility;
  constructor() {
    // bard: average cash flow cost of bereavement in america
    super(-25e3, NamedPeriods.SinglePeriod);
  }
}
export class Bereavement extends CashFlow {
  key= ComponentKey.Bereavement;
  constructor() {
    // bard: average cash flow cost of bereavement in america
    super(-20e3, NamedPeriods.SinglePeriod);
  }
}
export class RenovationAndRepairs extends CashFlow {
  key= ComponentKey.RenovationAndRepairs;
  constructor() {
    // bard: average cash flow cost of Renovation And Repairs in america
    super(-20e3, NamedPeriods.SinglePeriod);
  }
}

export class Inheritance extends CashFlow {
  key= ComponentKey.Inheritance;
  constructor() {
    // bard: average cash flow gain of inheritance in america
    super(180e3, NamedPeriods.SinglePeriod);
  }
}

export class Gifts extends CashFlow {
  key= ComponentKey.Gifts;
  constructor() {
    // bard: average cash flow cost of gifts in america
    super(-1e3, NamedPeriods.SinglePeriod);
  }
}
export class Insurance extends CashFlow {
  key= ComponentKey.Insurance;
  constructor() {
    // bard: average cash flow cost of insurance in america
    super(-10e3, NamedPeriods.SinglePeriod);
  }
}
export class Entrepreneurship extends CashFlow {
  key= ComponentKey.Entrepreneurship;
  constructor() {
    // bard: average cash flow cost of entreprenurship in america
    super(-40e3, NamedPeriods.SinglePeriod);
  }
}

export class Rental extends CashFlow {
  key= ComponentKey.Rental;
  constructor() {
    super(-36e3, NamedPeriods.Adulthood);
  }
}

export class HOA extends CashFlow {
  key= ComponentKey.HOA;
  constructor() {
    super(-12e3, NamedPeriods.Adulthood);
  }
}

export class PropertyTax extends CashFlow {
  key= ComponentKey.PropertyTax;
  constructor() {
    super(-12e3, NamedPeriods.Adulthood);
  }
}

export class RentalIncome extends CashFlow {
  key= ComponentKey.RentalIncome;
  constructor() {
    super(36e3, NamedPeriods.Adulthood);
  }
}


export class FancyCar extends CashFlow {
  key= ComponentKey.FancyCar;
  constructor() {
    super(120e3, NamedPeriods.SinglePeriod);
  }
}


export class NiceBigHouse extends CashFlow {
  key= ComponentKey.NiceBigHouse;
  constructor() {
    super(2e6, NamedPeriods.SinglePeriod);
  }
}

export class KidsCollegeFund extends CashFlow {
  key= ComponentKey.KidsCollegeFund;
  constructor() {
    super(14e3, NamedPeriods.Childhood);
  }
}

export class KidCollegeTuition extends CashFlow {
  key= ComponentKey.KidCollegeTuition;
  constructor() {
    super(250e3, NamedPeriods.SinglePeriod);
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