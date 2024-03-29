import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SimpleBetComponent } from './simple-bet/simple-bet.component';
import { CashFlowPlanComponent } from './cash-flow-plan/cash-flow-plan.component';
import { PosenetComponent } from './posenet/posenet.component';
import { ArticleComponent } from './article/article.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PokerComponent } from './poker/poker.component';
import { DemonComponent } from './demon/demon.component';
import { ParameterCollectionComponent,ParameterRouteData } from './parameter-collection/parameter-collection.component';
import { SummaryComponent,SummaryRouteData} from './summary/summary.component';
import { ResultsComponent,ResultsRouteData} from './results/results.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { RetirementArticleComponent } from './retirement-article/retirement-article.component';
import { ABOUT_RTB } from './utils/articles_mapper';
import { DatasetRouteData, DatasetViewerComponent } from './dataset-viewer/dataset-viewer.component';
import { sp500DatasetResolver } from './services/dataset.service';
import {of, Observable} from 'rxjs';
import { PinEditorComponent } from './pin-editor/pin-editor.component';
import * as ROUTE_COMPONENTS from './route-components';
import { CashFlowDiagramComponent } from './cash-flow-diagram/cash-flow-diagram.component';
import { BeginnerTalkComponent } from './beginner-talk/beginner-talk.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { SplashIntroComponent } from './splash-intro/splash-intro.component';


const PARAMETER_COLLECTION_RESULTS_HREF = 'l/0/results';
export const LEGACY_ROUTES: Routes = [
  {
    path: 'l/0',
    component: LayoutsComponent,
    children: [
      {
        path: 'pitch',
        component: ArticleComponent,
        data: {articles: [
          '/assets/articles/rtb-pitch.md',
        ]},
      },
      {path: 'datasets', children: [
        {
          path:'sp500',
          component:DatasetViewerComponent, 
          data: {title: 'SP500', resolver: sp500DatasetResolver} as DatasetRouteData,},
      ]},
      
      {path: 'retirement',
      component: RetirementArticleComponent,
      children: [
        ROUTE_COMPONENTS.SAVING,
        ROUTE_COMPONENTS.PINS,
        ROUTE_COMPONENTS.INVESTING,
        ROUTE_COMPONENTS.RETIREMENT,
        ROUTE_COMPONENTS.RETIREMENT_INCOME,
        ROUTE_COMPONENTS.THRESHOLDS,
        ROUTE_COMPONENTS.HISTORICAL_INVESTING,
        ROUTE_COMPONENTS.SIMULATION,
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
        path: 'poker',
        component: PokerComponent,
        data: {
        }
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
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
              href: PARAMETER_COLLECTION_RESULTS_HREF,
              inputs: [
                {label:'Number of simulations to run', 
                  name:'numWorkingSimulations',value: ''},
              ]
            } as ParameterRouteData
          },
        ],

        
      },
      {
        path: 'articles/resources',
        component: ArticleComponent,
        data: {articles: [
          '/assets/articles/intro.md',
          '/assets/articles/resources.md',
        ]},
        children: [
          
        ],
      },
      {
        path: 'learn',
        component: BeginnerTalkComponent,
      },
      {
        path: 'upgrade',
        component: UpgradeComponent,
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'intro',
        component: SplashIntroComponent,
      },
      {
        path: '',
        // component: WelcomeComponent,
        pathMatch: 'full',
        redirectTo: 'learn',
      },
      
      {
        path: 'debug/component',
        component: BeginnerTalkComponent,
      },
    ],
  },
  {
    path: 'l0/learn',
    redirectTo: 'l/0/learn',
    pathMatch: 'full',
  },
  {
    path: 'l0/retirement',
    redirectTo: 'l/0/retirement',
    pathMatch: 'full',
  },
  {
    path: 'l0',
    redirectTo: 'l/0',
    pathMatch: 'full',
  },
];