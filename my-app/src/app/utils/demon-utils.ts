import { HistoricalTimeSeries } from "./backtest";


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

function toHistoricalSeries(series: Promise<string>):Promise<Record[]> {
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

export function createWorkingRun(resp:Record[], leverage:number, contribution: number = 0, initial: number = 0):number[] {
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


function localCache() {
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
const TRADING_DAYS_PER_YEAR = 250;
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

export function createWorkingGraph(timeToWork: number, leverage:number, contribution: number = 0, initial: number = 0,numSimulations = NUM_SIMULATIONS) {
  const query: HistoricalQuery = {symbol: 'SPY', start:new Date('1998-01-01'),end: new Date('2021-01-01')};

  return memoizePromise(`createWorkingGraph_1_1_${JSON.stringify(arguments)}`, () => {
    const spy = toHistoricalSeries(fetchSymbol(query));
    return spy.then(resp =>{

      const simulations = new Array(numSimulations).fill(0).map(() => {
        return createWorkingRun(sampleSeries(resp, timeToWork * TRADING_DAYS_PER_YEAR), leverage, contribution / TRADING_DAYS_PER_YEAR,initial);
      });
      simulations.sort((a,b) => {
        return a.slice(-1)[0] - b.slice(-1)[0];
      });
      return simulations;
    }); 
  });
  
} 

// randomly samples values from a series
function sampleSeries<T>( series: T[], periods: number = TRADING_DAYS_PER_YEAR * YEARS_OF_RETIREMENT) {
  return new Array(periods).fill(0).map(() => {
    const sample = series[Math.floor(Math.random() * series.length)];
    return sample;
  });
}

// leverage the run per day, then build 'periods', weekly, monthly, annually.

// scale per period, the returns need to be scaled to the new period (is the only change)

export function createRunPerPeriod(
  periodsToInvest: number, 
  leverageDaily:number, 
  contributionPerPeriod: number = 0, 
  initialBalance: number = 0,
  numSimulations = NUM_SIMULATIONS) {
  const query: HistoricalQuery = {symbol: 'SPY', start:new Date('1998-01-01'),end: new Date('2021-01-01')};
  return toLeverageHistoricalSeries(query, leverageDaily).then(resp => {

    const simulations = new Array(numSimulations).fill(0).map(() => {
      return createLeveragedPeriodRun(sampleSeries(resp, periodsToInvest), contributionPerPeriod,initialBalance);
    });
    simulations.sort((a,b) => {
      return a.slice(-1)[0] - b.slice(-1)[0];
    });
    return simulations;
  });
}

function createLeveragedPeriodRun(
  resp:LeveragedRecord[], 
  contribution: number = 0, 
  initial: number = 0):number[] {
// TODO: make this similar to 'createWorkingRun'
  return [];
}


interface LeveragedRecord {
  date: Date;
  change: number;
  abs_change: number;
}

export function toLeverageHistoricalSeries(query, leverage):Promise<LeveragedRecord[]> {
  return toHistoricalSeries(fetchSymbol(query)).then(records => {
    return records.map((row, i, all) => {
      const change = i === 0 ? 0 :(row.close - all[i-1].close)/all[i-1].close;
      row.abs_change = Math.abs(change*leverage);
      row.change =  (change*leverage)+1;
      return row;
    });
  });
}
