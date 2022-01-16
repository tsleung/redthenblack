import { Record, HistoricalQuery, toHistoricalSeries, fetchSymbol, PeriodType } from './series';
import { memoizeLocalStorage, memoizePromise } from './local_storage';
import { createWorkingRun, createRun } from './run_mapper';
import { sampleSeries } from './series';

const NUM_SIMULATIONS = 200;
const TRADING_DAYS_PER_YEAR = PeriodType.YEAR;
const YEARS_OF_RETIREMENT = 60;

export function createPolicyConfidenceCurve(leverage = .75, yearsOfRetirement = YEARS_OF_RETIREMENT, numSimulations = NUM_SIMULATIONS): Promise<LeveragedWithdrawalConfidence[]> {
  return memoizePromise(`createPolicyConfidenceCurve_1_1_${JSON.stringify(arguments)}`, () => {
    const query: HistoricalQuery = { symbol: 'SPY', start: new Date('1998-01-01'), end: new Date('2021-01-01') };

    // roll forward 100(0) simulations of a 75% invested portfolio for 60 years with withdrawal 1-10%
    const spy = toHistoricalSeries(fetchSymbol(query));
    return spy.then(resp => {

      return memoizeLocalStorage(`createPolicyConfidenceCurve_3_${JSON.stringify(arguments)}`,
        () => {
          return _createPolicyConfidenceCurve(resp, ...arguments);
        });
    });
  });
}

// time vs investment vs withdrawal vs confidence
function _createPolicyConfidenceCurve(resp, leverage = .75, yearsOfRetirement = YEARS_OF_RETIREMENT, numSimulations = NUM_SIMULATIONS): LeveragedWithdrawalConfidence[] {
  // default policy is a % allocation of stocks and % withdrawal rate
  // 45-60 years, 60 years for now
  // 50%-75%, 60% for now
  // 0%-5%, ??? whatever is the 95% confidence
  // 95%, 0-1


  // nest egg starting value is 1.

  return new Array(9).fill(0).map((n, i) => {
    // convert to decimal
    return (i + 1) / 100;
  }).map(withdrawal => {
    const simulations = new Array(numSimulations).fill(0).map(() => {
      return createRun(sampleSeries(resp, yearsOfRetirement * TRADING_DAYS_PER_YEAR), leverage, withdrawal / TRADING_DAYS_PER_YEAR);
    });
    const confidence = simulations.reduce((accum, arr) => {
      const change = arr[arr.length - 1] > 0 ? 1 : 0;
      return accum + change;
    }, 0) / simulations.length;

    return {
      leverage,
      withdrawal,
      // simulations,
      confidence,
    };

  });
  // find the confidence of 95%, what did the nest egg need to be

  // roll forward 100(0) simulations of a 75% invested portfolio for 60 years with withdrawal 1-10%
  // find the confidence of 95%, what did the nest egg need to be

}

export interface LeveragedWithdrawalConfidence {
  leverage: number;
  withdrawal: number;
  confidence: number;
}

export function createWorkingGraph(
  timeToWork: number,
  leverage: number,
  contribution: number = 0,
  initial: number = 0,
  numSimulations = NUM_SIMULATIONS) {
  const query: HistoricalQuery = { symbol: 'SPY', start: new Date('1998-01-01'), end: new Date('2021-01-01') };
  const spy = toHistoricalSeries(fetchSymbol(query));
  return spy.then(resp => {

    const simulations = new Array(numSimulations).fill(0).map(() => {
      return createWorkingRun(sampleSeries(resp,
        timeToWork * TRADING_DAYS_PER_YEAR),
        leverage,
        contribution / TRADING_DAYS_PER_YEAR,
        initial);
    });
    simulations.sort((a, b) => {
      return a.slice(-1)[0] - b.slice(-1)[0];
    });

    return simulations;
  });
}