
// Systems

import { fetchAllByType } from "./life-event-utils";
import { Allocation, AmortizedLoan, Cash, CashFlow, ComponentKey, ComponentType, Contribution, Job, Retirement, SavingsAccount, Stocks, ValueComponent, VolatileAsset } from "./maya-ecs-components";
import { Entity, getComponent } from "./maya-ecs-entities";


export interface System {
  name: string;
  update: (entities: Entity[], period: number) => void;
}

export class VolatileAssetSystem implements System{
  name = 'VolatileAssetSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {
      fetchAllByType<VolatileAsset>(entity.components, ComponentType.VolatileAsset)
      .forEach((volatileAsset: VolatileAsset) => {
        volatileAsset.value = volatileAsset.value * selectRandomFromList(volatileAsset.annualMultiplier) ?? 1;
      });
    }
  }
}

/**
 * Looks through items to rebalance. For when the rebalance is active, will act to move an asset class closer to its desired position.
 * - Will sort all assets to be rebalanced based on its distance to desired target allocation.
 * - Perform all sell actions on asset and add to cash
 * - Perform all buy actions to subtract from cash and add to asset
 * 
 */
export class AllocationSystem implements System{
  name = 'AllocationSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {

      fetchAllByType<Allocation>(entity.components, ComponentType.Allocation)
      .forEach((rebalance: Allocation) => {
        // allocation between 0-1
        // get all the components and figure out their drift from target
        



      });
    }
  }
}


export class ContributionSystem implements System{
  name = 'ContributionSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {
      const cash = getComponent<Cash>(entity, ComponentKey.Cash);

      Array.from(entity.components.values())
      .filter(suspect => suspect.type === ComponentType.Contribution)
      .map(contribution => contribution as Contribution)
      .filter(contribution => currentPeriod >= contribution.startPeriod)
      .filter(contribution => currentPeriod < contribution.startPeriod + contribution.periods)
      .forEach((contribution: Contribution) => {
        const valueComponent = getComponent<ValueComponent>(entity, contribution.target);
        if(valueComponent) { // need to indicate when a contribution doesn't land anywhere
          valueComponent.value = (valueComponent.value ?? 0) + (contribution.contribution ?? 0);
        }
        
      });
    }
  }
}

export class CashFlowSystem implements System{
  name = 'CashFlowSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {
      const cash = getComponent<Cash>(entity, ComponentKey.Cash);

      Array.from(entity.components.values())
      .filter(suspect => suspect.type === ComponentType.CashFlow)
      .map(cashFlow => cashFlow as CashFlow)
      .filter(cashFlow => currentPeriod >= cashFlow.startPeriod)
      .filter(cashFlow => currentPeriod < cashFlow.startPeriod + cashFlow.periods)
      .forEach((cashFlow: CashFlow) => {
        cash.value = cash.value + cashFlow.contribution;
      });
    }
  }
}

export class RetirementSystem implements System{
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

export class LoanSystem implements System{
  name = 'LoanSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {

      const cash = getComponent<Cash>(entity, ComponentKey.Cash);

      Array.from(entity.components.values())
      .filter(suspect => suspect.type === ComponentType.AmortizedLoan)
      .map(amorizedLoan => amorizedLoan as AmortizedLoan)
      .filter(amortizedLoan => currentPeriod >= amortizedLoan.startPeriod)
      .forEach((amortizedLoan: AmortizedLoan) => {
        
        // Open the loan and receive principal at start
        if(currentPeriod === amortizedLoan.startPeriod) {
          cash.value = cash.value + amortizedLoan.principal;
        }

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