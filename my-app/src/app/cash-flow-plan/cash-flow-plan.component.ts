import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as c3 from 'c3';
import {Portfolio, HistoricalTimeSeries, BacktestParams,toHistoricalTimeSeries, BACKTESTER } from './backtest';

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

  constructor() {
    // betting on beta
    const portfolios:Portfolio[] = [
      ...new Array(30).fill(0).map((v,i)=> ({SPY:(i*.1)+.8})),
    ]
    const params = {
      maxRunsPerPortfolio: 200,
      maxRunsPerBacktest: 60,
      portfolios,
      series: {
        VIX: toHistoricalTimeSeries(localStorage.getItem('VIX')),
        SPY: toHistoricalTimeSeries(localStorage.getItem('SPY'))
      }
    };
    console.log('running backtester', params);
    const results = BACKTESTER.run(params);
    console.log('results', results);
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