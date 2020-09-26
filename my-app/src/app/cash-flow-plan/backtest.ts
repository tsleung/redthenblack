
import { ɵsetCurrentInjector } from '@angular/core';

export function arithMean(array: number[]) {
  return array.reduce((a, b) => a + b) / array.length;
}

export function geoMean(array: number[]) {
  return Math.pow(array.reduce((a, b) => a * b), 1 / array.length);
}

// create same but limited for above and below a value
/** Convert a set of values into indices sorted by distance */
export function indicesSortedByDistance(subject: number, dataset: number[]) {
  // [5,2,5,6,8,1,9,10,7,3,4].sort((a,b) => Math.abs(a-6) - Math.abs(b-6))
  const sorted = dataset.map((val,index) => {
    const distance = Math.abs(subject - val)
    return {index,val,distance};
  }).sort((a,b) => a.distance - b.distance)
  return sorted.map(val => val.index);
}


/** Convert a set of values into indices sorted by distance */
export function indicesSortedByDistanceAbove(subject: number, dataset: number[]) {
  const sorted = dataset.map((val,index) => {
    const distance = subject - val;
    return {index,val,distance};
  }).sort((a,b) => a.distance - b.distance)
  return sorted.filter(val => val.distance <= 0).map(val => val.index);
}

/** Convert a set of values into indices sorted by distance */
export function indicesSortedByDistanceBelow(subject: number, dataset: number[]) {
  const sorted = dataset.map((val,index) => {
    const distance = subject - val;
    return {index,val,distance};
  }).sort((a,b) => a.distance - b.distance)
  return sorted.filter(val => val.distance > 0).map(val => val.index);
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
  const results = [];
  while (results.length < params.maxRunsPerPortfolio) {
    const backtest: number[] = sampleFrom(params.indices, params.maxRunsPerBacktest).reduce((backtest, index) => {
      portfolio.SPY = portfolio.SPY ?? 0;

      return [backtest[0] * (1+(params.series.SPY.pctChange[index]*portfolio.SPY)),...backtest];
    }, [1])

    results.push(backtest);
  }

  return results;
}

export interface BacktestParams {
  maxRunsPerPortfolio: number;
  maxRunsPerBacktest: number;
  portfolios: Portfolio[],
  indices: number[]
  series: {
    VIX: HistoricalTimeSeries;
    SPY: HistoricalTimeSeries;
  }
}

export interface PortfolioBacktestResult {
  geoMean:number;
  arithGeoMean:number;
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
      const backtests:number[][] = createBacktest(params, portfolio).sort((a,b) => a[0]-b[0]);
      
      const geoMeans = backtests.map(backtest => {
        return geoMean(backtest);
      });

      const result = {portfolio, arithGeoMean: arithMean(geoMeans),geoMean:geoMean(geoMeans), geoMeans,backtests,};
      console.log('ran portfolio',portfolio,result);
      return result;
    });
    
    return {
      portfolios,
    };
  }
};