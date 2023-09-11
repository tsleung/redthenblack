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
import { MayaLayoutTwoColumnComponent } from './maya-layout-two-column/maya-layout-two-column.component';
import { MayaLayoutTwoRowComponent } from './maya-layout-two-row/maya-layout-two-row.component';
import { RentOrBuyCalculatorComponent } from './rent-or-buy-calculator/rent-or-buy-calculator.component';
import { OptimalBetSizingCalculatorComponent } from './optimal-bet-sizing-calculator/optimal-bet-sizing-calculator.component';
import { MortgageYourRetirementCalculatorComponent } from './mortgage-your-retirement-calculator/mortgage-your-retirement-calculator.component';
import { MathToMillionaireCalculatorComponent } from './math-to-millionaire-calculator/math-to-millionaire-calculator.component';
import { CouplesFinancesCalculatorComponent } from './couples-finances-calculator/couples-finances-calculator.component';
import { WeddingHoneymoonDownPaymentCalculatorComponent } from './wedding-honeymoon-down-payment-calculator/wedding-honeymoon-down-payment-calculator.component';
import { DebtHedgeInflationCalculatorComponent } from './debt-hedge-inflation-calculator/debt-hedge-inflation-calculator.component';
import { AmortizationCalculatorComponent } from './amortization-calculator/amortization-calculator.component';
import { PerpetuityCalculatorComponent } from './perpetuity-calculator/perpetuity-calculator.component';
import { FrontloadDcaRetirementComponent } from './frontload-dca-retirement/frontload-dca-retirement.component';

export const CALCULATOR = [
  {
    path: 'calculators/list',
    component: MayaCalculatorComponent,  
  },
  {
  path: 'calculators',
  component: MayaLayoutTwoColumnComponent,
  data: {
    featured: true
  },
  children: [
    {
      path: '',
      outlet: 'secondary',
      component: MayaCalculatorComponent,  
    },
    {
      path: '',
      component:  MayaLayoutTwoRowComponent,
      children: [
        {
          path: '',
          outlet: 'secondary',
          component: MayaCalculatorComponent,  
        },
        {
          path: 'savings',
          component: SavingsCalculatorComponent,
        },
        {
          path: 'indexing',
          component: IndexingCalculatorComponent,
        },
        {
          path: 'rent-or-buy',
          component: RentOrBuyCalculatorComponent,
        },
        {
          path: 'differences-in-debt',
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
          path: 'math-to-millionaire',
          component: MathToMillionaireCalculatorComponent,
        },
        { 
          path: 'kids-college-fund',
          component: KidsCollegeFundCalculatorComponent,
        },
        { 
          path: 'cost-of-living',
          component: CostOfLivingCalculatorComponent,
        },
        { 
          path: 'mortgage-your-retirement',
          component: MortgageYourRetirementCalculatorComponent,
        },
        { 
          path: 'optimal-bet-sizing',
          component: OptimalBetSizingCalculatorComponent,
        },
        { 
          path: 'couples-finances',
          component: CouplesFinancesCalculatorComponent,
        },
        { 
          path: 'wedding-honeymoon-down-payment',
          component: WeddingHoneymoonDownPaymentCalculatorComponent,
        },
        { 
          path: 'debt-hedge-inflation',
          component: DebtHedgeInflationCalculatorComponent,
        },
        { 
          path: 'amortization',
          component: AmortizationCalculatorComponent,
        },
        { 
          path: 'perpetuity',
          component: PerpetuityCalculatorComponent,
        },
        { 
          path: 'frontload-dca-401k',
          component: FrontloadDcaRetirementComponent,
        },
      ]
    },
    
  ],
}];