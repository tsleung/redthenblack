import { MayaCalculatorComponent } from './maya-calculator/maya-calculator.component';
import { SavingsCalculatorComponent } from './savings-calculator/savings-calculator.component';
import { IndexingCalculatorComponent } from './indexing-calculator/indexing-calculator.component';
import { PayingDebtCalculatorComponent } from './paying-debt-calculator/paying-debt-calculator.component';
import { ComparingCashFlowsCalculatorComponent } from './comparing-cash-flows-calculator/comparing-cash-flows-calculator.component';
import { BackToSchoolCalculatorComponent } from './back-to-school-calculator/back-to-school-calculator.component';
import { GasOrElectricCalculatorComponent } from './gas-or-electric-calculator/gas-or-electric-calculator.component';
import { RetirementWithdrawalCalculatorComponent } from './retirement-withdrawal-calculator/retirement-withdrawal-calculator.component';
import { SeniorCareCalculatorComponent } from './senior-care-calculator/senior-care-calculator.component';
import { KidsCollegeFundCalculatorComponent } from './kids-college-fund-calculator/kids-college-fund-calculator.component';
import { CostOfLivingCalculatorComponent } from './cost-of-living-calculator/cost-of-living-calculator.component';

export const CALCULATOR = {
  path: 'calculator',
  component: MayaCalculatorComponent,
  children: [
    {
      path: 'savings',
      component: SavingsCalculatorComponent,
    },
    {
      path: 'indexing',
      component: IndexingCalculatorComponent,
    },
    {
      path: 'paying-debt',
      component: PayingDebtCalculatorComponent,
    },
    {
      path: 'comparing-cash-flows',
      component: ComparingCashFlowsCalculatorComponent,
    },
    {
      path: 'back-to-school',
      component: BackToSchoolCalculatorComponent,
    },
    {
      path: 'gas-or-electric',
      component: GasOrElectricCalculatorComponent,
    },
    {
      path: 'retirement-withdrawal',
      component: RetirementWithdrawalCalculatorComponent,
    },
    {
      path: 'senior-care',
      component: SeniorCareCalculatorComponent,
    },
    {
      path: 'kids-college-fund',
      component: KidsCollegeFundCalculatorComponent,
    },
    {
      path: 'cost-of-living',
      component: CostOfLivingCalculatorComponent,
    },
  ],
};