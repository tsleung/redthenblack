
import { ɵsetCurrentInjector } from '@angular/core';

export function arithMean(array: number[]) {
  return array.reduce((a, b) => a + b) / array.length;
}

export function geoMean(array: number[]) {
  return Math.pow(array.reduce((a, b) => a * b), 1 / array.length);
}

export function toHistoricalTimeSeries(raw: string): HistoricalTimeSeries {
  return {
    pctChange: toPctChange(raw),
    dates: toDates(raw),
    values: toValues(raw),
  }
}
function toRows(raw: string) {
  const rows = raw.split('\n').filter(Boolean);
  rows.shift();
  return rows;
}
function toDates (raw: string) {
  return toRows(raw).map(row => new Date(row.split('\t')[0]));
}
function toPctChange (raw: string) {
  const closes = toValues(raw);

  return closes.map((val,i,arr) => {
    return arr[i+1] 
    ? (val - arr[i+1]) / arr[i+1]
    : 1;
  },[]);
}

function toValues(raw: string) {
  return toRows(raw).map(row => Number(row.split('\t')[4]));
}
export interface HistoricalTimeSeries {
  dates: Date[];
  pctChange: number[];
  values: number[];
}

export interface Portfolio {
  SPY?: number;
}

function sampleFrom(dataset, numSamples: number, isValid = (i) => true): number[] {
  const samples: number[] = dataset.reduce((accum, val, i) => {
    return isValid(i) ?
      [...accum, i] :
      accum;
  }, []);

  return new Array(numSamples).fill(0).map(() => {
    const index = Math.floor(Math.random() * samples.length);
    return samples[index];
  });
}

function createBacktest(params: BacktestParams, portfolio: Portfolio):number[][] {
  const SPY_RETURNS = params.series.SPY.pctChange;
  const results = [];
  while (results.length < params.maxRunsPerPortfolio) {
    const backtest: number[] = sampleFrom(SPY_RETURNS, params.maxRunsPerBacktest).reduce((backtest, index) => {
      portfolio.SPY = portfolio.SPY ?? 0;

      return [backtest[0] * (1+(SPY_RETURNS[index]*portfolio.SPY)),...backtest];
    }, [1])

    results.push(backtest);
  }

  return results;
}

export interface BacktestParams {
  maxRunsPerPortfolio: number;
  maxRunsPerBacktest: number;
  portfolios: Portfolio[],
  series: {
    VIX: HistoricalTimeSeries;
    SPY: HistoricalTimeSeries;
  }
}

export interface PortfolioBacktestResult {
  geoMean:number;
  backtests: number[][];
  geoMeans: number[];
  portfolio: Portfolio;
}
export interface BacktestResults {
  portfolios: PortfolioBacktestResult[]
}

export const BACKTESTER = {
  run: (params: BacktestParams):BacktestResults => {

    const portfolios:PortfolioBacktestResult[] = params.portfolios.map(portfolio => {
      console.log('running portfolio',portfolio);
      const backtests:number[][] = createBacktest(params, portfolio).sort((a,b) => a[0]-b[0]);
      
      const geoMeans = backtests.map(backtest => {
        return geoMean(backtest);
      });

      return {portfolio, geoMean:geoMean(geoMeans), geoMeans,backtests,};
    });
    
    return {
      portfolios,
    };
  }
};