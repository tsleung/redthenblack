
// Systems

import { AmortizedLoan, AmortizedLoanComponent, Cash, ComponentKey, ComponentType, CostOfLiving, Job, Retirement, SavingsAccount, Stocks } from "./maya-ecs-components";
import { Entity, getComponent } from "./maya-ecs-entities";

// MarketSystem
export class MarketSystem {
  name = 'MarketSystem';
  update(entities: Entity[]) {
    for (const entity of entities) {
      const stocks = getComponent<Stocks>(entity,ComponentKey.Stocks);
      // console.log('checking market', stocks)
      if (stocks) {
        stocks.value = this.calculateNewValue(stocks.value, stocks.annualReturns);
        // console.log('updating market', stocks)
      }
    }
  }

  private calculateNewValue(currentValue: number, annualReturns: number[]): number {
    return currentValue * selectRandomFromList(annualReturns) ?? 1;
  }
}

export class IncomeSystem {
  name = 'IncomeSystem';
  update(entities: Entity[]) {
    for (const entity of entities) {
      const cash = getComponent<Cash>(entity, ComponentKey.Cash);
      const job = getComponent<Job>(entity, ComponentKey.Job);
      const costOfLiving = getComponent<CostOfLiving>(entity, ComponentKey.CostOfLiving);
      
      if (cash && job && job.periods > 0) { 
        cash.value = this.calculateNewValue(cash, job);
      }

      if (cash && costOfLiving) { 
        cash.value = cash.value - costOfLiving.cashFlow;
      }
    }
  }

  private calculateNewValue(cash: Cash, job: Job): number {
    return cash.value + job.cashFlow;
  }
}

export class InterestSystem {
  name = 'InterestSystem';
  update(entities: Entity[]) {
    for (const entity of entities) {
      const savingsAccount = getComponent<SavingsAccount>(entity, ComponentKey.SavingsAccount);
      savingsAccount.value = savingsAccount.value * (1+ selectRandomFromList(savingsAccount.interestRates)??0);
      
    }
  }
}

export class RetirementSystem {
  name = 'RetirementSystem';
  update(entities: Entity[]) {
    for (const entity of entities) {
      const job = getComponent<Job>(entity, ComponentKey.Job);
      if(job) {
        job.periods = job.periods - 1;
      }
      
      const retirement = getComponent<Retirement>(entity, ComponentKey.Retirement);
      if(retirement) {
        retirement.period = retirement.period - 1;
        
        if(retirement.period <=0) {
          job.periods = 0;
        }
      }
      
    }
  }
}

export class LoanSystem {
  name = 'LoanSystem';
  update(entities: Entity[]) {
    for (const entity of entities) {

      const cash = getComponent<Cash>(entity, ComponentKey.Cash);

      Array.from(entity.components.values())
      .filter(suspect => suspect.type === ComponentType.AmortizedLoan)
      .map(amorizedLoan => amorizedLoan as AmortizedLoan)
      .forEach((amortizedLoan: AmortizedLoan) => {
        const loanPaymentsForYear = this.calculateLoanPaymentsForYear(
          amortizedLoan.principal, 
          amortizedLoan.interestRate, 
          amortizedLoan.monthlyPayment
        );
        amortizedLoan.principal = loanPaymentsForYear.principal;
        cash.value = cash.value - (loanPaymentsForYear.principalPayments + loanPaymentsForYear.interestPayments);
      });
      
    }
  }

  calculateLoanPaymentsForYear(principal: number, interestRate: number, monthlyPayment: number) {
    const annualPayments = new Array(12).fill(0).reduce(({principal, principalPayments, interestPayments}) => {
      const interestPayment = this.calculateMonthlyInterestPayment(principal, interestRate);


      // If principal is less than monthly payment, principal payment reduces to only that of the principal
      const principalPayment = Math.min(principal, monthlyPayment - interestPayment);

      // reducing principal loan balance
      principal = principal - principalPayment;

      // keeping track of principal payments
      principalPayments = principalPayments + principalPayment;
      // keeping track of interest payments
      interestPayments = interestPayments + interestPayment;
      return {
        principal,
        principalPayments,
        interestPayments,
      };
    }, {principal, principalPayments: 0, interestPayments: 0});

    return annualPayments;
  }

  calculateMonthlyInterestPayment(principal: number, interestRate: number) {
    const monthlyInterestPayment = principal * interestRate / 12;
    return monthlyInterestPayment;
  }
}


// IncomeSystem, ExpenseSystem, LifeMilestoneSystem, CareerSystem (similar structure)

function selectRandomFromList<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}