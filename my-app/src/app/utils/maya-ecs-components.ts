
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
  
}
export enum ComponentType {
  Value,
  CashFlow,
  AmortizedLoan,
  Milestone,
}

export interface Component {
  key: ComponentKey;
  type: ComponentType;
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

export class SavingsAccount implements ValueComponent {
  key = ComponentKey.SavingsAccount;
  type = ComponentType.Value;
  constructor(public value, public interestRates:number[]) {}
}

interface CashFlowComponent extends Component{
  cashFlow: number
}

export class Job implements CashFlowComponent{
  key = ComponentKey.Job;
  type = ComponentType.CashFlow;
  constructor(public cashFlow, public periods: number) {}
}

export class CostOfLiving implements CashFlowComponent{
  key = ComponentKey.CostOfLiving;
  type = ComponentType.CashFlow;
  constructor(public cashFlow) {}
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

export interface AmortizedLoanComponent extends Component{
  principal: number;
  interestRate: number;
  monthlyPayment: number;
}

export class AmortizedLoan implements AmortizedLoanComponent{
  type = ComponentType.AmortizedLoan;
  key: ComponentKey;
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
