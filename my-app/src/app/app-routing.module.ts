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
    ]}
  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'results',
        component: ResultsComponent,
        data: {
          href: '/summary'
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
                  {label: 'Withdrawal Rate from Nest Egg', 
                  name:'withdrawalRate'},
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
                {label:'Time to work', 
                  name:'timeToWorkInYears',},
                {label: 'Investing leverage', 
                name:'investingLeverage',},
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
        ],

        
      },
      {
        path: '',
        component: WelcomeComponent,
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
