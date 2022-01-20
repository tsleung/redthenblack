import { Record, HistoricalQuery, toHistoricalSeries, fetchSymbol, PeriodType } from './series';

// creates a run over a security with a consistently applied leverage
export function createRun(resp: Record[], leverage: number, withdrawal: number = 0): number[] {
  return resp.reduce((accum, record: Record) => {
    const previousBalance = accum[accum.length - 1];
    const previousBalanceAfterWithdrawal = previousBalance - withdrawal;
    const newBalance = previousBalanceAfterWithdrawal * (((record.change - 1) * leverage) + 1);
    accum.push(previousBalanceAfterWithdrawal > 0 ? newBalance : 0);
    return accum;
  }, [1]);
}


// creates a run over a security with a consistently applied leverage
// target nest egg is "1"
// starting balance is percentage of nest egg
// accumulation is percentage of nest egg
// start the account with an initial balance "1"
// target to exit is when account hits a mutiplier e.g. 2x/10x

export function createWorkingRun(resp: Record[],
  leverage: number,
  contribution: number = 0,
  initial: number = 0): number[] {
  return resp.reduce((accum, record: Record) => {
    const previousBalance = accum[accum.length - 1];
    const previousBalanceAfterContribution = previousBalance + contribution;
    const newBalance = previousBalanceAfterContribution < 1 ?
      previousBalanceAfterContribution * (((record.change - 1) * leverage) + 1) :
      previousBalanceAfterContribution;
    accum.push(previousBalanceAfterContribution > 0 ? newBalance : 0);
    return accum;
  }, [initial]);
}
