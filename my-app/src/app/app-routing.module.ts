import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';
import { PosenetComponent } from './posenet/posenet.component';
import { ArticleComponent } from './article/article.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { DemonComponent } from './demon/demon.component';
import { ParameterCollectionComponent,ParameterRouteData } from './parameter-collection/parameter-collection.component';
import { SummaryComponent,SummaryRouteData} from './summary/summary.component';
import { ResultsComponent,ResultsRouteData} from './results/results.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { RetirementArticleComponent } from './retirement-article/retirement-article.component';
import { ABOUT_RTB } from './utils/articles_mapper';

const routes: Routes = [
  { path: 'bet', component: SimpleBetComponent },
  { path: 'game', component: GameComponent },
  { path: 'pose', component: PosenetComponent },
  { path: 'editor', component: DemonComponent },
  {
    path: 'beta',
    component: CashFlowPlanComponent,
    children: [
      // { path: '', outlet: 'game', component: GameComponent },
      // { path: '', outlet: 'game2', component: GameComponent },
    ],
  },
  {
    path: 'articles',
    component: ArticleComponent,
    data: {articles: [
      '/assets/articles/intro.md',
      '/assets/articles/resources.md',
    ]},
    children: [
      
    ],
  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {path: 'pitch',
      component: ArticleComponent,
      data: {articles: [
        '/assets/articles/rtb-pitch.md',
      ]},
      },
      {path: 'retirement',
      component: RetirementArticleComponent,
      children: [
        {
          path: '',
          outlet: 'saving',
          component: ParameterCollectionComponent,
          data: {
            title:'Income and savings',
            description: 'A fundamental part of starting any retirement plan is generating income and putting aside a portion of that income into savings. Starting to save earlier will allow more time to accumulate.',
            href: '/retirement',
            inputs: [
              {label: `Savings per year.`, name:'annualAmountSavedAfterTax', value: '',
              placeholder: 'How much are you putting away every year?',
              startHint: ``,
              endHint: ''
            },
            {label:'After tax income', 
                  name:'annualAfterTaxIncome',value: ''},
              
            ]
          } as ParameterRouteData
        },
        
        {
          path: '',
          outlet: 'investing',
          component: ParameterCollectionComponent,
          data: {
            title:'Investing in the stock market',
            description: 'A fundamental part of executing any retirement strategy is generating additional income through investing. Investments assumed is 20 years of an S&P 500 ETF with leverage compounded daily. When to rebalance is an incredibly challenging problem, thus is done naively depending on time scale (observable by number of periods in working chart within the results).',
            href: '/retirement',
            inputs: [
              {label:'Investing leverage while working', 
                name:'investingLeverage',},
                {label: 'Current savings', name:'initialSavings', value: ''},
                {label:'Time to work', 
                name:'timeToWorkInYears',},
            ]
          } as ParameterRouteData
        },
        {
          path: '',
          component: ParameterCollectionComponent,
          outlet: 'retirement',
          data: {
            title:'Retirement horizon',
            description: `The duration of retirement drastically affects the size of nest egg that needs to be accumulated while working. As a rule of thumb annual withdrawal over a 30 year retirement could use a 4% withdrawal rate while annual withdrawal over a 60 year retirement would use a 2% withdrawal rate.`,
            href: '/retirement',
            inputs: [
              {label:'Time in retirement', 
                name:'retirementTimeHorizonInYears',},
                {label: 'Nest Egg', 
                name:'nestEgg'},
            ]
          } as ParameterRouteData
        },
        
       {
          path: '',
          component: ParameterCollectionComponent,
          outlet: 'retirement-income',
          data: {
            title:'Additional returns during Retirement',
            description: 'The burden of working can be reduced by continuing to invest while in retirement. Additionally modifying the amount of nest egg consumed each year will affect confidence of retirement.',
            href: '/retirement',
            inputs: [
              {label:'Target nest egg', 
                name:'nestEgg',},  
              {label: 'Desired annual retirement income', 
                name:'annualRetirementIncome'},
                {label: 'Investing leverage in retirement', 
                name:'retirementInvestingLeverage'},

            ]
          } as ParameterRouteData
        },
        {
          path: '',
          outlet: 'thresholds',
          component: ParameterCollectionComponent,
          data: {
            title:'Thresholds',
            description: 'Personal finance is inherently... personal. Suitability factors in appetite and risk tolerance. One expression is defining thresholds for (1) target (2) safety (3) reach outcomes.',
            href: '/retirement',
            inputs: [
              {label:'Target', 
              startHint:'Default is .5, where 50% of outcomes are better', 
              name:'targetThreshold',},
              {label:'Safety',
              startHint:'Default is .05, where 95% of outcomes are better', 
              name:'safetyThreshold',},
              {label:'Reach',
              startHint:'Default is .65, where 35% of outcomes are better',  
              name:'reachThreshold',},
              
            ]
          } as ParameterRouteData
        },
        {
          path: '',
          outlet: 'simulation',
          component: ParameterCollectionComponent,
          data: {
            title:'Simulation',
            description: 'Multiple simulations are run under the given assumptions in order to determine the confidence in the results.',
            href: '/retirement',
            inputs: [
              {label:'Number of simulations to run', 
              name:'numWorkingSimulations',value: ''},
            ]
          } as ParameterRouteData
        },
        {
          path: '',
          outlet: 'results',
          component: ResultsComponent,
          data: {
            href: '/retirement',
            showNavigation: false,
          } as ResultsRouteData
        },
        {path: '',
        outlet: 'introduction',
        component: ArticleComponent,
        data: {
          showNavigation: false,
          articles: [
          '/assets/articles/retirement-introduction.md',
        ]},
        },
        /*
        {
          path: '',
          component: SummaryComponent,
          outlet: 'summary',
          data: {
          } as SummaryRouteData
        },
        */
      ],
      },
      {
        path: 'results',
        component: ResultsComponent,
        data: {
          href: '/summary',
          showNavigation: true,
        } as ResultsRouteData
      },
      {
        path: 'summary',
        component: SummaryComponent,
        data: {
        } as SummaryRouteData
      },
      {
        path: 'params',
        children:[
          {
            path: 'millionaire',
            component: ParameterCollectionComponent,
            data: {
              title:'Math to a million',
              article: ABOUT_RTB,
              href: 'results',
              inputs: [
                {label: 'Savings per year', name:'annualAmountSavedAfterTax'},
                {label: 'Current savings', name:'initialSavings'},
                {label:'Investing leverage while working', name:'investingLeverage'},
                {label:'Time to work', name:'timeToWorkInYears'},
                {label:'Target nest egg', name:'nestEgg', value:'1000000'},
              ]
            } as ParameterRouteData
          },
          {
            path: 'saver',
            component: ParameterCollectionComponent,
            data: {
              title:'Saver',
              href: 'results',
              inputs: [
                {label: 'Savings per year', name:'annualAmountSavedAfterTax'},
                {label: 'Current savings', name:'initialSavings'},
                {label:'Investing leverage while working', name:'investingLeverage',value:'0'},
                {label:'Time to work', name:'timeToWorkInYears',},
                {label:'Target nest egg', name:'nestEgg'},
                {label: 'Investing leverage in retirement', 
                  name:'retirementInvestingLeverage'},
              ]
            } as ParameterRouteData
          },
          {
            path: 'egg',
            component: ParameterCollectionComponent,
            data: {
              title:'Nest egg',
              href: 'results',
              inputs: [
                {label:'Time in retirement', 
                  name:'retirementTimeHorizonInYears',},
                  {label: 'Desired annual retirement income', 
                  name:'annualRetirementIncome'},
                {label: 'Investing leverage in retirement', 
                  name:'retirementInvestingLeverage'},
              ]
            } as ParameterRouteData
          },

          {
            path: 'leverage',
            component: ParameterCollectionComponent,
            data: {
              title:'Investing leverage',
              href: 'results',
              inputs: [
                {label:'Investing leverage while working', 
                  name:'investingLeverage',},
                {label: 'Investing leverage in retirement', 
                  name:'retirementInvestingLeverage'},
              ]
            } as ParameterRouteData
          },
          {
            path: 'retirement',
            component: ParameterCollectionComponent,
            data: {
              title:'Retirement',
              href: 'results',
              inputs: [
                {label:'Time in retirement', 
                  name:'retirementTimeHorizonInYears',},
                  {label: 'Desired annual retirement income', 
                  name:'annualRetirementIncome'},
                  {label: 'Nest Egg', 
                  name:'nestEgg'},
                  {label: 'Investing leverage in retirement', 
                  name:'retirementInvestingLeverage'},
              ]
            } as ParameterRouteData
          },
          {
            path: 'working',
            component: ParameterCollectionComponent,
            data: {
              title:'Working',
              href: 'results',
              inputs: [
                {label: 'Savings per year', name:'annualAmountSavedAfterTax', value: ''},
                {label: 'Current savings', name:'initialSavings', value: ''},
                {label:'Investing leverage while working', 
                  name:'investingLeverage',},
                {label:'Time to work', 
                  name:'timeToWorkInYears',},
                  {label:'Target nest egg', 
                  name:'nestEgg',},
              ]
            } as ParameterRouteData
          },
          {
            path: 'income',
            component: ParameterCollectionComponent,
            data: {
              title:'Parameters',
              href: 'results',
              inputs: [
                {label:'After tax income', 
                  name:'annualAfterTaxIncome',value: ''},
                {label: 'After tax savings', name:'annualAmountSavedAfterTax', value: ''},
              ]
            } as ParameterRouteData
          },
          {
            path: 'simulation',
            component: ParameterCollectionComponent,
            data: {
              title:'Simulation',
              href: 'results',
              inputs: [
                {label:'Number of simulations to run', 
                  name:'numWorkingSimulations',value: ''},
              ]
            } as ParameterRouteData
          },
        ],

        
      },

      {
        path: '',
        //component: WelcomeComponent,
        pathMatch: 'full',
        redirectTo: 'retirement',
      },

    ],
  },
  
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
