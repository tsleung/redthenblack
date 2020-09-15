
import { ɵsetCurrentInjector } from '@angular/core';

interface Portfolio {

  SPY?: number;
}

// can generate types of portfolios for actions the agent can take
const portfolios_value_model: [number, Portfolio][] = [
  [1, { SPY: 1.0, }],
  // [1, { SPY: 0.5, }],
];

interface BacktestParams {
  betSize: number;
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

function determineAction(params: BacktestParams, index: number) {
  return portfolios_value_model[Math.floor(Math.random() * portfolios_value_model.length)][1];
}

function createBacktest(params: BacktestParams) {
  const SPY_RETURNS = [];
  const results = [];
  while (results.length < 100)
  {
    const backtest: number[] = sampleFrom(SPY_RETURNS, 20 * 3).reduce((backtest, index) => {
      const change = SPY_RETURNS[index][1];
      const current = backtest[0];
      // const portfolio = determineAction(params, index);

      const spyBet = current;
      const cash = Math.max(0, current - spyBet);
      const trade = spyBet * (((change - 1) * params.betSize) + 1);

      //console.log('trade', params.betSize, change, cash, trade)

      return [cash + trade, ...backtest];
    }, [1])

    results.push(backtest);
  }

  return results;
}
export const BACKTESTER = {
  doSomething: (() => {
    return // blocking run

    new Array(30).fill(0)
      .map((x, i) => {
        const betSize = (i / 10) + 1;

        const results = createBacktest({ betSize });
        // console.log(betSize, 'results', results);
        return results;
      })
      .map((results, i) => {
        const betSize = i / 10 + 1;
        const summary = results.map(result => result[0]).sort();

        console.log(betSize, 'summary', geoMean(summary));
        return summary;
      });

  })()
};

function arithMean(array: number[]) {
  return array.reduce((a, b) => a + b) / array.length;
}

function geoMean(array: number[]) {
  return Math.pow(array.reduce((a, b) => a * b), 1 / array.length);
}


function pctChangeFromEntry(entry) {
  return entry[1];
}


// select your goals, 2 of 3


// select your outcomes
const outcomes = [].map(pctChangeFromEntry);
// find the free variable, the 1 of 3

// create condition for backtest to continue
const condition = (account, time) => {
  return time > 250;
};


function createAgent() {


}
function observe() {

}

function act() {

}
/** How we choose an action */
function policy() {

}
/** How good is an action */
function value() {

}
