import { Observable } from "rxjs";
import { HistoricalTimeSeries } from "./backtest";


enum PeriodType {
  DAY = 1,
  MONTH = 21,
  YEAR = 252,
}

interface Record {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    adj_close: number;
    volume: number;
    spread: number;
    change: number;
    abs_change: number;
}

export function toHistoricalSeries(series: Promise<string>):Promise<Record[]> {
  return series.then(resp => {
    return resp.split('\n');
  })
  .then(resp => {
    console.log('header', resp[0])
    const rows = resp.slice(1);

    const records = rows.map(row => row.split(',')).map((row, i) => {
      const open = Number(row[1]);
      const high = Number(row[2]);
      const low = Number(row[3]);

      return {
        date: new Date(row[0]),
        open: Number(row[1]),
        high: Number(row[2]),
        low: Number(row[3]),
        close: Number(row[4]),
        adj_close: Number(row[5]),
        volume: Number(row[6]),
        // generated
        spread: Math.abs((high - low) / open),
        // populate later
        change: 1,
        abs_change: 0,
        
      }
    });
    
    return records.map((row, i, all) => {
      const change = i === 0 ? 0 :(row.close - all[i-1].close)/all[i-1].close;
      row.abs_change = Math.abs(change);
      row.change =  (change)+1;
      return row;
    });
  });
}


export function fetchSymbol(query: HistoricalQuery = {symbol: 'SPY', start:new Date('2018-01-01'),end: new Date('2021-01-01')}):Promise<string> {
  return new Promise(resolve => {
    const cacheKey = JSON.stringify(query);
    const ret = localCache().getItem(cacheKey);
    
    const resolveFromServer = () => fetch(`https://us-central1-red-then-black.cloudfunctions.net/getSymbol?symbol=${query.symbol}&start=${query.start.toLocaleDateString()}&end=${query.end.toLocaleDateString()}`)
    .then(resp => {
      return resp.text();
    })  
    .then(text=> {
      console.log('server:', cacheKey);
      localCache().setItem(cacheKey, text);
      resolve(text);
    });

    const resolveFromCache = () => {
      console.log('cache:', cacheKey);
      resolve(ret);
    };
    const resolver = (ret) ? resolveFromCache : resolveFromServer;
    resolver();
  });

}
  
// creates a run over a security with a consistently applied leverage
export function createSimpleRun(resp:Record[], leverage:number):number[] {
    return resp.reduce((accum, record:Record) => {
        const previousBalance = accum[accum.length-1];
        const newBalance = previousBalance * (((record.change-1) * leverage)+1);
        accum.push(newBalance);
        return accum;
    },[1]);
}

// creates a run over a security with a consistently applied leverage
export function createRun(resp:Record[], leverage:number, withdrawal: number = 0):number[] {
  return resp.reduce((accum, record:Record) => {
      const previousBalance = accum[accum.length-1];
      const previousBalanceAfterWithdrawal = previousBalance - withdrawal;
      const newBalance = previousBalanceAfterWithdrawal * (((record.change-1) * leverage)+1);
      accum.push(previousBalanceAfterWithdrawal > 0 ? newBalance : 0);
      return accum;
  },[1]);
}


// creates a run over a security with a consistently applied leverage
// target nest egg is "1"
  // starting balance is percentage of nest egg
  // accumulation is percentage of nest egg
  // start the account with an initial balance "1"
  // target to exit is when account hits a mutiplier e.g. 2x/10x

export function createWorkingRun(resp:Record[], 
  leverage:number, 
  contribution: number = 0, 
  initial: number = 0):number[] {
  return resp.reduce((accum, record:Record) => {
      const previousBalance = accum[accum.length-1];
      const previousBalanceAfterContribution = previousBalance + contribution;
      const newBalance = previousBalanceAfterContribution < 1 ? 
        previousBalanceAfterContribution * (((record.change-1) * leverage)+1): 
        previousBalanceAfterContribution;
      accum.push(previousBalanceAfterContribution > 0 ? newBalance : 0);
      return accum;
  },[initial]);
}

interface HistoricalQuery {
  start: Date;
  end: Date;
  symbol: string;
}

enum CacheType {
  SmallSizeHighLatencyOnline,
  HighLatencyOffline
}
interface CacheEntry {
  type: CacheType
}

export function localCache() {
  return {
    getItem: (key: string) => {
      return window.localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      try{ 
        window.localStorage.setItem(key, value);
      } catch (e) {
        window.localStorage.clear();
      }  
    }
  }
}

// Create promise memoize, saves promise contents if successful and returns

function memoizePromise<T>(key, resolver: () => Promise<T>) {
  const localItem = localCache().getItem(key);
  return (localItem != null) ?
    Promise.resolve(JSON.parse(localItem) as T) :
    resolver().then(ret => {
      localCache().setItem(key, JSON.stringify(ret));
      return ret;
    });
}

/**
 * Retrieves an item from local storage based on key, or if not present, resolves the value and puts
 * 
 * @param key 
 * @param resolver 
 * @returns 
 */
function memoizeLocalStorage<T>(key:string, resolver:() => T):T {
  const localItem = localCache().getItem(key);
  const ret:T =  localItem === null ? 
    resolver() : 
    JSON.parse(localCache().getItem(key)) as T;
  
  localCache().setItem(key, JSON.stringify(ret));

  return ret;
}


//const symbol ='DOGE-USD';
// 2016 vs 1998
export function createHistoricalLeverageRuns(leverage, query: HistoricalQuery = {symbol: 'SPY', start:new Date('2016-01-01'),end: new Date('2021-01-01')}):Promise<c3.Data> {
    
  return memoizePromise(`createHistoricalLeverageRuns_1_1_${JSON.stringify(arguments)}`, () => {
    return toHistoricalSeries(fetchSymbol(query)).then(resp =>{
      return memoizeLocalStorage(`createHistoricalLeverageRuns_1_$(JSON.stringify(arguments)}`, () => _createHistoricalLeverageRuns(resp, leverage, query));
    });
  })
}


function _createHistoricalLeverageRuns(resp, leverage, query: HistoricalQuery = {symbol: 'SPY', start:new Date('2016-01-01'),end: new Date('2021-01-01')}):c3.Data {
  
  const spy = createRun(resp, leverage);

  return {
    columns: [
      ['x', ...spy.map((v,i) => i)],
      ['.5',...createRun(resp, .5)],
      ['1',...createRun(resp, 1)],
      ['1.5',...createRun(resp, 1.5)],
      ['2',...createRun(resp, 2)],
      ['2.5',...createRun(resp, 2.5)],
      ['3.0',...createRun(resp, 3)],
      ['4.0',...createRun(resp, 4)],
      ['spy',...spy]
    ]
  }
}



const NUM_SIMULATIONS = 200;
const TRADING_DAYS_PER_YEAR = PeriodType.YEAR;
const YEARS_OF_RETIREMENT = 60;


export function createPolicyConfidenceCurve(leverage = .75, yearsOfRetirement = YEARS_OF_RETIREMENT, numSimulations = NUM_SIMULATIONS):Promise<LeveragedWithdrawalConfidence[]> {
  return memoizePromise(`createPolicyConfidenceCurve_1_1_${JSON.stringify(arguments)}`, () => {
    const query: HistoricalQuery = {symbol: 'SPY', start:new Date('1998-01-01'),end: new Date('2021-01-01')};

    // roll forward 100(0) simulations of a 75% invested portfolio for 60 years with withdrawal 1-10%
    const spy = toHistoricalSeries(fetchSymbol(query));
    return spy.then(resp =>{
  
      return memoizeLocalStorage(`createPolicyConfidenceCurve_3_${JSON.stringify(arguments)}`, 
      () => {
        return _createPolicyConfidenceCurve(resp, ...arguments);
      });
    });
  });
}

export interface LeveragedWithdrawalConfidence {
  leverage: number;
  withdrawal: number;
  confidence: number;
}

// time vs investment vs withdrawal vs confidence
function _createPolicyConfidenceCurve(resp, leverage = .75, yearsOfRetirement = YEARS_OF_RETIREMENT, numSimulations = NUM_SIMULATIONS):LeveragedWithdrawalConfidence[] {
  // default policy is a % allocation of stocks and % withdrawal rate
  // 45-60 years, 60 years for now
  // 50%-75%, 60% for now
  // 0%-5%, ??? whatever is the 95% confidence
  // 95%, 0-1


  // nest egg starting value is 1.

    return new Array(9).fill(0).map((n,i) => {
      // convert to decimal
      return (i+1) / 100;
    }).map(withdrawal => {
      const simulations = new Array(numSimulations).fill(0).map(() => {
        return createRun(sampleSeries(resp, yearsOfRetirement * TRADING_DAYS_PER_YEAR), leverage, withdrawal / TRADING_DAYS_PER_YEAR);
      });
      const confidence = simulations.reduce((accum, arr) => {
        const change = arr[arr.length -1] > 0 ? 1 : 0;
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

export function createWorkingGraph(
  timeToWork: number, 
  leverage:number, 
  contribution: number = 0, 
  initial: number = 0,
  numSimulations = NUM_SIMULATIONS) {
  const query: HistoricalQuery = {symbol: 'SPY', start:new Date('1998-01-01'),end: new Date('2021-01-01')};
  const spy = toHistoricalSeries(fetchSymbol(query));
  return spy.then(resp =>{

    const simulations = new Array(numSimulations).fill(0).map(() => {
      return createWorkingRun(sampleSeries(resp, 
        timeToWork * TRADING_DAYS_PER_YEAR), 
        leverage, 
        contribution / TRADING_DAYS_PER_YEAR,
      initial);
    });
    simulations.sort((a,b) => {
      return a.slice(-1)[0] - b.slice(-1)[0];
    });
    
    return simulations;
  }); 
} 

// randomly samples values from a series
function sampleSeries<T>( series: T[], periods: number) {
  return new Array(periods).fill(0).map(() => {
    const sample = series[Math.floor(Math.random() * series.length)];
    return sample;
  });
}

// leverage the run per day, then build 'periods', weekly, monthly, annually.

// scale per period, the returns need to be scaled to the new period (is the only change)
/** Used for leveraged runs for DAY, MONTH, YEAR */
export function createRunPerPeriod(
  timeToWorkInYears: number, 
  leverageDaily:number, 
  contribution: number = 0, 
  initialBalance: number = 0,
  numSimulations = NUM_SIMULATIONS) {
  const query: HistoricalQuery = {symbol: 'SPY', start:new Date('1998-01-01'),end: new Date('2021-01-01')};

  const performantPeriodType = timeToWorkInYears < 2  ? PeriodType.DAY : 
    timeToWorkInYears < 5  ? PeriodType.MONTH :  
    PeriodType.YEAR;
    
  return toLeverageHistoricalSeries(query, leverageDaily, performantPeriodType).then(leveragedSeries => {

    const simulations = new Array(numSimulations).fill(0).map(() => {

      const contributionPerPeriod = leveragedSeries.periodType === PeriodType.YEAR ? contribution :
    leveragedSeries.periodType === PeriodType.MONTH ? contribution  / PeriodType.YEAR * PeriodType.MONTH :
    leveragedSeries.periodType === PeriodType.DAY ? contribution  / PeriodType.YEAR : 
    contribution  / PeriodType.YEAR;

    const numPeriods = leveragedSeries.periodType === PeriodType.YEAR ? timeToWorkInYears :
    leveragedSeries.periodType === PeriodType.MONTH ? 12 * timeToWorkInYears:
    leveragedSeries.periodType === PeriodType.DAY ? PeriodType.YEAR * timeToWorkInYears : 
      timeToWorkInYears;

    // console.log('leveragedSeries', leveragedSeries, numPeriods, contributionPerPeriod);
    
      return createLeveragedPeriodRun(
        leveragedSeries, 
        numPeriods,
        contributionPerPeriod,
        initialBalance
        );
    });
    simulations.sort((a,b) => {
      return a.slice(-1)[0] - b.slice(-1)[0];
    });
    return simulations;
  });
}

function createLeveragedPeriodRun(
  leveragedSeries:LeveragedSeries, 
  numPeriods: number,
  contributionPerPeriod: number,
  initial: number = 0):number[] {
    // converting contribution to period
  
  return sampleSeries(leveragedSeries.series, numPeriods).reduce((accum, record:LeveragedRecord) => {
    const previousBalance = accum[accum.length-1];
    const previousBalanceAfterContribution = previousBalance + contributionPerPeriod;
    const newBalance = previousBalanceAfterContribution < 1 ? 
      previousBalanceAfterContribution * (((record.change-1))+1): 
      previousBalanceAfterContribution;
    accum.push(previousBalanceAfterContribution > 0 ? newBalance : 0);
    return accum;
  },[initial]);
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
  periodType:PeriodType
):Promise<LeveragedSeries> {
  return toHistoricalSeries(fetchSymbol(query)).then(records => {

    const series = records.map((row, i, all) => {
      const change = i === 0 ? 0 :(row.close - all[i-1].close)/all[i-1].close;
      row.abs_change = Math.abs(change*leverage);
      row.change =  (change*leverage)+1;
      return row;
    });

    return periodType === PeriodType.MONTH ? {series: multiplySeriesToPeriod(PeriodType.MONTH, series), periodType: PeriodType.MONTH} : 
      periodType === PeriodType.YEAR ? {series: multiplySeriesToPeriod(PeriodType.YEAR, series), periodType: PeriodType.YEAR} :
      {series: multiplySeriesToPeriod(PeriodType.DAY, series), periodType: PeriodType.DAY};
  });

  function multiplySeriesToPeriod(
    multipleToPeriod: number, 
    series: LeveragedRecord[]
  ):LeveragedRecord[] {
    //  return new Array(series.length * multipleToPeriod).fill(0).map(() => {
      return new Array(series.length).fill(0).map(() => {
        // sample the series for the number of periods we are translating to, multiply to find the change over the period (e.g. month/year)
        // and return the compounded return.
        const change = sampleSeries(series, multipleToPeriod).reduce((change, sample) => {
          return change * sample.change;
        },1);

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
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
