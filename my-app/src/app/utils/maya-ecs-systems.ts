
// Systems

import { Cash, ComponentKey, CostOfLiving, Job, Retirement, SavingsAccount, Stocks } from "./maya-ecs-components";
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

// IncomeSystem, ExpenseSystem, LifeMilestoneSystem, CareerSystem (similar structure)

function selectRandomFromList<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}