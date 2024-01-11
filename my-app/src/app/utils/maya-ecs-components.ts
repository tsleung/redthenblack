
enum NamedPeriods { 
  StartPeriod = 0,
  EndPeriod = 120,
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

interface CashFlowComponent extends DelayedStartComponent{
  cashFlow: number
}

export class CashFlow implements CashFlowComponent {
  key: ComponentKey;
  type = ComponentType.CashFlow;
  startPeriod = NamedPeriods.StartPeriod;
  
  constructor(public cashFlow, public periods: number = 0) {
  }
}

export class ChildCare extends CashFlow {
  key= ComponentKey.ChildCare;
  periods = 18;
}

export class SeniorCare extends CashFlow {
  key= ComponentKey.SeniorCare;
  periods = 120;
}

export class Job extends CashFlow implements TimeBoundComponent{
  key = ComponentKey.Job;
  startPeriod = 0;
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