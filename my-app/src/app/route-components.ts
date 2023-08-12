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

const PARAMETER_COLLECTION_RESULTS_HREF = 'l/0/retirement';
export const PINS = 
        
{
  path: '',
  outlet: 'pins',
  component: PinEditorComponent,
  data: {
    title:'Larger life events and expenses',
    description: 'A comprehensive strategy should include notable events and expenses. An exotic vacation, fancy car, or warm home are better to accommodate for.',
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
      {label: `Savings per year.`, name:'annualAmountSavedAfterTax', value: '',
      placeholder: 'How much are you putting away every year?',
      startHint: ``,
      endHint: ''
    },
    /*
    {label:'After tax income', 
          name:'annualAfterTaxIncome',value: ''},
      */
    ]
  } as ParameterRouteData
};

export const SAVING = {
  path: '',
  outlet: 'saving',
  component: ParameterCollectionComponent,
  data: {
    title:'Income and savings',
    description: 'A fundamental part of starting any retirement plan is generating income and putting aside a portion of that income into savings. Starting to save earlier will allow more time to accumulate.',
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
      {label:'Time to work', 
        name:'timeToWorkInYears',},
      {label: `Savings per year.`, name:'annualAmountSavedAfterTax', value: '',
      placeholder: 'How much are you putting away every year?',
      startHint: ``,
      endHint: ''
    },

    
    {label:'After tax income', 
          name:'annualAfterTaxIncome',value: ''},
      
    ]
  } as ParameterRouteData
};

export const INVESTING = {
  path: '',
  outlet: 'investing',
  component: ParameterCollectionComponent,
  data: {
    title:'Investing in the stock market',
    description: 'A fundamental part of executing any retirement strategy is generating additional income through investing. Investments assumed is 20 years of an S&P 500 ETF with leverage compounded daily. When to rebalance is an incredibly challenging problem, thus is done naively correlated to the length of investment duration.',
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
      {label:'Investing leverage while working', 
        name:'investingLeverage',},
        {label: 'Current savings', name:'initialSavings', value: ''},
        
    ]
  } as ParameterRouteData
};

export const HISTORICAL_INVESTING = {
  path: '',
  outlet: 'historical',
  component: ParameterCollectionComponent,
  data: {
    title:'Simulating historical market returns',
    description: 'Historical market returns may reveal insights from past decisions made by comparing simulation with reality. It is worth keeping in mind that past performance is not indicative of future returns, and a core component of a confidence model is accounting for variance.',
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
        {label: 'Historical years to include', name:'yearsIncludingHistoricalData'},
        {label: 'Latest trading date', name:'historicalEndDate', type:'date'},
    ]
  } as ParameterRouteData
};
export const RETIREMENT = {
  path: '',
  component: ParameterCollectionComponent,
  outlet: 'retirement',
  data: {
    title:'Retirement horizon',
    description: `The duration of retirement drastically affects the size of nest egg that needs to be accumulated while working. As a rule of thumb annual withdrawal over a 30 year retirement could use a 4% withdrawal rate while annual withdrawal over a 60 year retirement would use a 2% withdrawal rate.`,
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
      {label:'Time in retirement', 
        name:'retirementTimeHorizonInYears',},
        {label: 'Nest Egg', 
        name:'nestEgg'},
    ]
  } as ParameterRouteData
};
export const RETIREMENT_INCOME = 
{
  path: '',
  component: ParameterCollectionComponent,
  outlet: 'retirement-income',
  data: {
    title:'Additional returns during Retirement',
    description: 'The burden of working can be reduced by continuing to invest while in retirement. Additionally modifying the amount of nest egg consumed each year will affect confidence of retirement.',
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
      {label: 'Desired annual retirement income', 
        name:'annualRetirementIncome'},
        {label: 'Investing leverage in retirement', 
        name:'retirementInvestingLeverage'},

    ]
  } as ParameterRouteData
};
export const THRESHOLDS = {
  path: '',
  outlet: 'thresholds',
  component: ParameterCollectionComponent,
  data: {
    title:'Thresholds',
    description: 'Personal finance is inherently... personal. Suitability factors in appetite and risk tolerance. One expression is defining thresholds for (1) target (2) safety (3) reach outcomes.',
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
      {label:'Target',
      tooltip:'Default is .4, where 60% of outcomes are better', 
      name:'targetThreshold',
      max: 1,
    },
      {label:'Safety',
      tooltip:'Default is .1, where 90% of outcomes are better', 
      max: 1,
      name:'safetyThreshold',},
      {label:'Reach',
      tooltip:'Default is .6, where 40% of outcomes are better',  
      max: 1,
      name:'reachThreshold',},
      
    ]
  } as ParameterRouteData
};
export const SIMULATION = {
  path: '',
  outlet: 'simulation',
  component: ParameterCollectionComponent,
  data: {
    title:'Simulation',
    description: 'Multiple simulations are run under the given assumptions in order to determine the confidence in the results.',
    href: PARAMETER_COLLECTION_RESULTS_HREF,
    inputs: [
      {label:'Number of simulations to run', 
      name:'numWorkingSimulations',value: ''},
    ]
  } as ParameterRouteData
};
