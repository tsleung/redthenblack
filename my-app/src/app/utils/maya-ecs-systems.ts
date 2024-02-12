
// Systems
import { AmortizedLoan, Cash, CashFlow, ComponentKey, ComponentType, Contribution, FixedAllocation, Job, Retirement, SavingsAccount, Stocks, ValueComponent, VolatileAsset } from "./maya-ecs-components";
import { Entity, getComponent, getMandatoryComponentOrError } from "./maya-ecs-entities";
import { executeReallocation, fetchAllByType, totalCashValue, totalVolatileAssetValue } from "./maya-ecs-utils";


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
 * - R^2 percentage difference for getting as close to target allocation
 */
export class FixedAllocationSystem implements System{
  name = 'FixedAllocationSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {

      const cash = getMandatoryComponentOrError<Cash>(entity, ComponentKey.Cash);
      
      const volatileAssetsValue = totalVolatileAssetValue(entity);

      const totalPortfolioValue = Math.floor(
        totalCashValue(entity) +
        volatileAssetsValue
      );

      fetchAllByType<FixedAllocation>(entity.components, ComponentType.FixedAllocation)
      .forEach((allocation: FixedAllocation) => {
        // allocation between 0-1
        // get all the components and figure out their drift from target

        const target = allocation.target;
        const percentage = allocation.percentage;
        
        const volatileAsset = getMandatoryComponentOrError<VolatileAsset>(entity, target);
        const desiredPosition = percentage * totalPortfolioValue;

        executeReallocation(
          cash,
          volatileAsset,
          desiredPosition,
        );
      });
    }
  }
}

export class ContributionSystem implements System{
  name = 'ContributionSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {
      Array.from(entity.components.values())
      .filter(suspect => suspect.type === ComponentType.Contribution)
      .map(contribution => contribution as Contribution)
      .filter(contribution => currentPeriod >= contribution.startPeriod)
      .filter(contribution => currentPeriod < contribution.startPeriod + contribution.periods)
      .forEach((contribution: Contribution) => {
        const valueComponent = getMandatoryComponentOrError<ValueComponent>(entity, contribution.target);
        valueComponent.value = (valueComponent.value ?? 0) + (contribution.contribution ?? 0);
      });
    }
  }
}

export class LoanSystem implements System{
  name = 'LoanSystem';
  update(entities: Entity[], currentPeriod: number) {
    for (const entity of entities) {

      const cash = getMandatoryComponentOrError<Cash>(entity, ComponentKey.Cash);

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