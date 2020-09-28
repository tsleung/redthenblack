import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as c3 from 'c3';
import {Portfolio, indicesSortedByDistance,indicesSortedByDistanceAbove,indicesSortedByDistanceBelow,HistoricalTimeSeries, BacktestParams,toHistoricalTimeSeries, BACKTESTER } from './backtest';

const names = [
  // 'Amazing',
  'Intrigued',
  // 'Ambitious',
  // 'a Genius',
  // 'the Savior',
  // 'a Forward Thinker',
  //'planning for my future',
];

function pickRandom<T>(arr: T[], valid = (suspect: T) => true): T {
  const index = Math.floor(Math.random() * arr.length);
  console.log('index', index);
  const val = arr[index];
  return valid(val) ? val : pickRandom(arr, valid);
}

@Directive({ selector: 'h2' })
class Titles {
}

@Component({
  selector: 'app-cash-flow-plan',
  templateUrl: './cash-flow-plan.component.html',
  styleUrls: ['./cash-flow-plan.component.scss']
})
export class CashFlowPlanComponent {
  showData = false;
  outputData = '';
  backtester = BACKTESTER;
  name = pickRandom(names);
  worth = '$1M';
  timeline = '16';
  policy = 'fixed investing';
  sampleMarketData = 'markets similar to the past couple of decades'
  runsPerPortfolio = 250;
  periodsPerBacktest = 250;


  chartData:c3.Data = {
  columns: [
  ],
  type: 'scatter'
  }

  constructor() {
  }
  updateRunsPerPortfolio() {
    this.runsPerPortfolio = Number(window.prompt('Runs per portfolio'));
  }
  updatePeriodsPerBacktest() {
    this.periodsPerBacktest = Number(window.prompt('Periods per backtest'));
  }

  runBacktest() {

    const targetVIX = Number(window.prompt('Target VIX', '35'));
    const percentage = Number(window.prompt('percentage','50')) / 100;
    const balance = Boolean(Number(window.prompt('Balance aroudn VIX', '1')));
    // betting on beta
    const portfolios:Portfolio[] = [
      {SPY: 0.0},
      {SPY: 0.2},
      {SPY: 0.4},
      {SPY: 0.6},
      {SPY: 0.8},
      {SPY: 1.0},
      {SPY: 1.2},
      {SPY: 1.4},
      {SPY: 1.6},
      {SPY: 1.8},
      {SPY: 2.0},
      {SPY: 2.2},
      {SPY: 2.4},
      {SPY: 2.6},
      {SPY: 2.8},
      {SPY: 3.0},
      {SPY: 3.2},
      {SPY: 3.4},
      {SPY: 3.6},
      {SPY: 4.0},
      {SPY: 5.0},
    ];
    const aboveIndices = indicesSortedByDistanceAbove(targetVIX, toHistoricalTimeSeries(localStorage.getItem('VIX')).values);
    const belowIndices = indicesSortedByDistanceBelow(targetVIX, toHistoricalTimeSeries(localStorage.getItem('VIX')).values);
    const sortedIndices = indicesSortedByDistance(targetVIX, toHistoricalTimeSeries(localStorage.getItem('VIX')).values)
    // grab equal above and below if balanced, otherwise just grab closest
    const indices = balance ? [
      ...aboveIndices.slice(0,Math.round(sortedIndices.length * percentage / 2)),
      ...belowIndices.slice(0,Math.round(sortedIndices.length * percentage / 2))
    ] : sortedIndices.slice(0,Math.round(sortedIndices.length * percentage)); 

    const params = {
      maxRunsPerPortfolio: this.runsPerPortfolio,
      maxRunsPerBacktest: this.periodsPerBacktest,
      portfolios,
      indices,
      series: {
        VIX: toHistoricalTimeSeries(localStorage.getItem('VIX')),
        SPY: toHistoricalTimeSeries(localStorage.getItem('SPY'))
      }
    };
    console.log('running backtester', params);
    const results = BACKTESTER.run(params);
    console.log('results', results);

    this.chartData = {
      columns: [['Leverage',...results.portfolios.map(portfolio => {
        return portfolio.geoMean;
      })]],
      
    }
  }

  onEnter(e) {
    e.preventDefault();
  }
  onNameChange(val: string) {
    console.log('val', val)
    this.name = `${val}`.trim() || pickRandom(names, (name => name != this.name));
  }

  onSavingsChange(val: string) {

  }

  onSavingsRateChange(val: string) {

  }

  saveData() {
    const symbol = window.prompt('Symbol');
    const data = window.prompt('Data');
    localStorage.setItem(symbol, data);
  }


  loadData() {
    const symbol = window.prompt('Symbol', 'SPY');
    this.outputData = localStorage.getItem(symbol);
  }
  
  clearOutput() {
    this.outputData = '';
  }

}