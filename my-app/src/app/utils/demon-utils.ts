
import { Record, HistoricalQuery, toHistoricalSeries, fetchSymbol, PeriodType } from './series';
import { memoizeLocalStorage, memoizePromiseLocalStorage, memoizePromiseInMemory} from './local_storage';
import { Pin } from '../services/pins.service';
import { createRun } from './run_mapper';
import { sampleSeries, createSampleIndexesFrom } from './series';

// creates a run over a security with a consistently applied leverage
export function createSimpleRun(resp: Record[], leverage: number): number[] {
  return resp.reduce((accum, record: Record) => {
    const previousBalance = accum[accum.length - 1];
    const newBalance = previousBalance * (((record.change - 1) * leverage) + 1);
    accum.push(newBalance);
    return accum;
  }, [1]);
}


//const symbol ='DOGE-USD';
// 2016 vs 1998
export function createHistoricalLeverageRuns(leverage, query: HistoricalQuery = { symbol: 'SPY', start: new Date('2016-01-01'), end: new Date('2021-01-01') }): Promise<c3.Data> {

  return memoizePromiseLocalStorage(`createHistoricalLeverageRuns_1_1_${JSON.stringify(arguments)}`, () => {
    return toHistoricalSeries(fetchSymbol(query)).then(resp => {
      return memoizeLocalStorage(`createHistoricalLeverageRuns_1_$(JSON.stringify(arguments)}`, () => _createHistoricalLeverageRuns(resp, leverage, query));
    });
  })
}


function _createHistoricalLeverageRuns(resp, leverage, query: HistoricalQuery = { symbol: 'SPY', start: new Date('2016-01-01'), end: new Date('2021-01-01') }): c3.Data {

  const spy = createRun(resp, leverage);

  return {
    columns: [
      ['x', ...spy.map((v, i) => i)],
      ['.5', ...createRun(resp, .5)],
      ['1', ...createRun(resp, 1)],
      ['1.5', ...createRun(resp, 1.5)],
      ['2', ...createRun(resp, 2)],
      ['2.5', ...createRun(resp, 2.5)],
      ['3.0', ...createRun(resp, 3)],
      ['4.0', ...createRun(resp, 4)],
      ['spy', ...spy]
    ]
  }
}

// leverage the run per day, then build 'periods', weekly, monthly, annually.

function createPeriodRunParameters(
  timeToWorkInYears: number,
  leverageDaily: number,
  contribution: number = 0,
  initialBalance: number = 0,
  numSimulations = 100 // 100 picked arbitrarily
) {
  return {
    timeToWorkInYears,
    leverageDaily,
    contribution,
    initialBalance,
    numSimulations,
  };
}
interface PeriodRunParameters {
  timeToWorkInYears: number;
  leverageDaily: number;
  contribution: number;
  initialBalance: number;
  numSimulations: number;
}
interface CashFlowEvent {
  triggerPeriod: number;
  amount: number;
}
// scale per period, the returns need to be scaled to the new period (is the only change)
/** Used for leveraged runs for DAY, MONTH, YEAR */
export function createRunPerPeriod(
  timeToWorkInYears: number,
  leverageDaily: number,
  contribution: number = 0,
  initialBalance: number = 0,
  numSimulations,
  pins: Pin[] = [],): Promise<number[][]> {
  const query: HistoricalQuery = { symbol: 'SPY', start: new Date('1998-01-01'), end: new Date('2021-01-01') };

  const performantPeriodType = timeToWorkInYears < 2 ? PeriodType.DAY :
    timeToWorkInYears < 20 ? PeriodType.MONTH :
      timeToWorkInYears < 60 ? PeriodType.QUARTER :
        PeriodType.YEAR;

  return Promise.all([
    toLeverageHistoricalSeries(query, leverageDaily, performantPeriodType),
    toLeverageHistoricalSeries(query, leverageDaily, performantPeriodType)
  ]).then(([leveragedSeries,retiredSeries]) => {

      const simulations = new Array(numSimulations).fill(0).map(() => {


        const cashFlowEvents = leveragedSeries.periodType === PeriodType.YEAR ? pins.map(pin => ({amount: pin.amount ,triggerPeriod: pin.years * PeriodType.YEAR})) :
          leveragedSeries.periodType === PeriodType.QUARTER ? pins.map(pin => ({amount: pin.amount ,triggerPeriod: pin.years * 4})) :
            leveragedSeries.periodType === PeriodType.MONTH ? pins.map(pin => ({amount: pin.amount ,triggerPeriod: pin.years * 12})):
              leveragedSeries.periodType === PeriodType.DAY ? pins.map(pin => ({amount: pin.amount ,triggerPeriod: pin.years * PeriodType.YEAR})) :
              pins.map(pin => ({amount: pin.amount ,triggerPeriod: pin.years * PeriodType.YEAR}));

        const contributionPerPeriod = leveragedSeries.periodType === PeriodType.YEAR ? contribution :
          leveragedSeries.periodType === PeriodType.QUARTER ? contribution / PeriodType.YEAR * PeriodType.QUARTER :
            leveragedSeries.periodType === PeriodType.MONTH ? contribution / PeriodType.YEAR * PeriodType.MONTH :
              leveragedSeries.periodType === PeriodType.DAY ? contribution / PeriodType.YEAR :
                contribution / PeriodType.YEAR;

        const numPeriods = leveragedSeries.periodType === PeriodType.YEAR ? timeToWorkInYears :
          leveragedSeries.periodType === PeriodType.QUARTER ? 4 * timeToWorkInYears :
            leveragedSeries.periodType === PeriodType.MONTH ? 12 * timeToWorkInYears :
              leveragedSeries.periodType === PeriodType.DAY ? PeriodType.YEAR * timeToWorkInYears :
                timeToWorkInYears;

        // console.log('leveragedSeries', leveragedSeries, numPeriods, contributionPerPeriod);
        return createLeveragedPeriodRun(
          leveragedSeries,
          retiredSeries,
          numPeriods,
          contributionPerPeriod,
          initialBalance,
          cashFlowEvents,
        );
      });
      simulations.sort((a, b) => {
        return a.slice(-1)[0] - b.slice(-1)[0];
      });
      return simulations;
    });
}

function createLeveragedPeriodRun(
  leveragedSeries: LeveragedSeries,
  retirementSeries: LeveragedSeries,
  numPeriods: number,
  contributionPerPeriod: number,
  initial: number = 0,
  cashFlowEvents: CashFlowEvent[] = []): number[] {
  // converting contribution to period

  return createSampleIndexesFrom(leveragedSeries.series, numPeriods).reduce((accum, sampleIndex, periodIndex) => {
    const record = leveragedSeries.series[sampleIndex];
    const retiredRecord = retirementSeries.series[sampleIndex];
    // console.log('record',record, retiredRecord, sampleIndex, leveragedSeries, retirementSeries)

    const previousBalance = accum[accum.length - 1];
    const previousBalanceAfterContribution = previousBalance + contributionPerPeriod;

    const previousBalanceAfterCashFlowEvents = cashFlowEvents.reduce((balance, cashFlowEvent) => {
      return  cashFlowEvent.triggerPeriod === periodIndex ?
        balance - cashFlowEvent.amount : 
        balance;
    },previousBalanceAfterContribution);
    // change strategies here for after nest egg
    
    // Only invest if < 1 OR Keep investing regardless
    const KEEP_INVESTING_REGARDLESS = false; // remove this when sensical 
    const newBalance = previousBalanceAfterCashFlowEvents < 1 || KEEP_INVESTING_REGARDLESS ?
      previousBalanceAfterCashFlowEvents * (((record.change - 1)) + 1) :
      previousBalanceAfterCashFlowEvents * (((retiredRecord.change - 1)) + 1);

    accum.push(previousBalanceAfterCashFlowEvents > 0 ? newBalance : 0);

    
    return accum;
  }, [initial]);
}

interface LeveragedRecord {
  change: number;
}

interface LeveragedSeries {
  periodType: PeriodType;
  series: LeveragedRecord[]
}


export function toLeverageHistoricalSeries(
  query,
  leverage,
  periodType: PeriodType
): Promise<LeveragedSeries> {
  const maxSamples = 1e5;
  return memoizePromiseInMemory(JSON.stringify({query,leverage,periodType,maxSamples}), () => {
    return _toLeverageHistoricalSeries(query,leverage,periodType, maxSamples);
  });
}

function _toLeverageHistoricalSeries(
  query,
  leverage,
  periodType: PeriodType,
  maxSamples: number,
): Promise<LeveragedSeries> {
  return toHistoricalSeries(fetchSymbol(query)).then(records => {

    const series = records.map((row, i, all) => {
      const change = i === 0 ? 0 : (row.close - all[i - 1].close) / all[i - 1].close;
      row.abs_change = Math.abs(change * leverage);
      row.change = (change * leverage) + 1;
      return row;
    });

    return periodType === PeriodType.MONTH ? { series: multiplySeriesToPeriod(PeriodType.MONTH, series), periodType: PeriodType.MONTH } :
      periodType === PeriodType.QUARTER ? { series: multiplySeriesToPeriod(PeriodType.QUARTER, series), periodType: PeriodType.QUARTER } :
        periodType === PeriodType.YEAR ? { series: multiplySeriesToPeriod(PeriodType.YEAR, series), periodType: PeriodType.YEAR } :
          { series: multiplySeriesToPeriod(PeriodType.DAY, series), periodType: PeriodType.DAY };
  });

  function multiplySeriesToPeriod(
    multipleToPeriod: number,
    series: LeveragedRecord[]
  ): LeveragedRecord[] {
    // comment for performance, should mutiple length by period (capped at 100k / 1e5, max samples)
    return new Array(Math.min(series.length * multipleToPeriod, maxSamples)).fill(0).map(() => {
      // return new Array(series.length).fill(0).map(() => {
      // sample the series for the number of periods we are translating to, multiply to find the change over the period (e.g. month/year)
      // and return the compounded return.
      const change = sampleSeries(series, multipleToPeriod).reduce((change, sample) => {
        return change * sample.change;
      }, 1);

      return {
        change,
      };
    });
  }
}

// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
export function friendlyMoney(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function calculatePercentileOutcome(percentile: number, simulations: number[][]) {
  return simulations[Math.floor(simulations.length * percentile)].slice(-1)[0];
}

function calculateMedianOutcome(simulations: number[][]) {
  return calculatePercentileOutcome(.5, simulations);
}
export interface Threshold {
  target: number;
  safety: number;
  reach: number;
}
export function createSummary(
  threshold: Threshold,
  timeToWorkInYears: number,
  targetNestEgg: number,
  simulations: number[][]) {

  // working results
  const successfulRuns = simulations.filter(simulation => {
    return simulation.slice(-1)[0] > 1;
  }).length;
  const medianOutcome = calculatePercentileOutcome(.5, simulations);
  const safetyOutcome = calculatePercentileOutcome(threshold.safety, simulations);
  const reachOutcome = calculatePercentileOutcome(threshold.reach, simulations);
  const targetOutcome = calculatePercentileOutcome(threshold.target, simulations);
  const successRate = successfulRuns / simulations.length;

  return {
    successfulRuns,
    nestEgg: friendlyMoney(targetNestEgg, 1),
    successRate,
    medianOutcome: `${friendlyMoney(Math.round(medianOutcome * targetNestEgg), 1)}`,
    reachOutcome: `${friendlyMoney(Math.round(reachOutcome * targetNestEgg), 1)}`,
    safetyOutcome: `${friendlyMoney(Math.round(safetyOutcome * targetNestEgg), 1)}`,
    targetOutcome: `${friendlyMoney(Math.round(targetOutcome * targetNestEgg), 1)}`,
    time: `${timeToWorkInYears}y`,
    confidence: `${Math.round(successRate * 100)}%`,
    value: friendlyMoney(targetNestEgg, 1),
  };
}

export function selectRepresentativeSample<T>(numSamples: number, series: T[]): T[] {
  return series.reduce((accum, val, i, arr) => {
    const shouldInclude = i % Math.ceil(arr.length / numSamples) == 0 || i === arr.length - 1;

    return shouldInclude ? accum.concat([val]) : accum;
  }, []);
}

export function createNestEggAchievedMessage(
  targetNestEgg: number,
  simulations: number[][]) {
  const medianOutcome = simulations[Math.floor(simulations.length / 2)].slice(-1)[0];

  // working results
  const successfulRuns = simulations.filter(simulation => {
    return simulation.slice(-1)[0] > 1;
  }).length;

  const successRate = successfulRuns / simulations.length;

  return `${successfulRuns} of ${simulations.length} simulations reach nest egg goal of ${targetNestEgg}, ${successRate * 100}% success. The median outcome made it ${Math.round(medianOutcome * 100)}% to retirement.`;
}

export interface SimulationResult {
  params: number[];
  results: number[][];
}

export interface Recommendation {
  message: string;
  action: () => void;
}
export function createRecommendationsFromPertubations(
  threshold: Threshold,
  timeToWorkInYears: number,
  targetNestEgg: number,
  baseline: SimulationResult,
  pertubations: SimulationResult[])
  : Recommendation[] {

  return [
    ...createLeverageRecommendations(
      threshold,
      timeToWorkInYears, targetNestEgg,
      baseline, pertubations),
  ];
}


export function createLeverageRecommendations(
  threshold: Threshold,
  timeToWorkInYears: number,
  targetNestEgg: number,
  baseline: SimulationResult,
  pertubations: SimulationResult[])
  : Recommendation[] {
  // where baseline != pertubation, filter for a better median outcome
  return pertubations.filter(pertubation => {
    return leverageFromSimulationResult(pertubation) != leverageFromSimulationResult(baseline);
  }).filter(pertubation => {
    return hasHigherTargetOutcome(baseline, pertubation,threshold);
  }).map(pertubation => {
    const pertubationSummary = createSummary(threshold, timeToWorkInYears, targetNestEgg, pertubation.results);
    const current = leverageFromSimulationResult(baseline);
    const improvement = leverageFromSimulationResult(pertubation);
    const mediumOutcome = pertubationSummary.medianOutcome;
    const action = () => {
      console.log('implement noop action');

    }; // noop for now, should open params
    const message = `Modifying leverage to ${improvement} from ${current} should improve median outcome to ${mediumOutcome}`;
    return {
      message,
      action,
    };
  });

}

function hasHigherTargetOutcome(
  baseline: SimulationResult,
  pertubation: SimulationResult,
  threshold: Threshold): boolean {
  return calculatePercentileOutcome(threshold.target, pertubation.results) >
  calculatePercentileOutcome(threshold.target, baseline.results) * 1.1;
}

function hasHigherMedianOutcome(
  baseline: SimulationResult,
  pertubation: SimulationResult): boolean {
  return calculateMedianOutcome(pertubation.results) >
    calculateMedianOutcome(baseline.results) * 1.05;
}

function hasHigherNestEggAchievement(timeToWorkInYears: number,
  targetNestEgg: number, baseline: SimulationResult,
  pertubation: SimulationResult) {

}


function leverageFromSimulationResult(simulationResult: SimulationResult) {
  return simulationResult.params[1];
}
