
export enum ComponentKey {
  Cash='Cash',
  Stocks='Stocks',
  SavingsAccount='SavingsAccount',
  Job='Job',
  Mortgage='Mortgage',
}
export enum ComponentType {
  Value,
  CashFlow,
  Loan,
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
  constructor(public cashFlow) {}
}