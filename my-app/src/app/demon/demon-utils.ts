import { HistoricalTimeSeries } from "../cash-flow-plan/backtest";


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

function localCache() {
  return {
    getItem: (key: string) => {
      return window.localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      return window.localStorage.setItem(key, value);
    }
  }
}

export function fetchSymbol(query: HistoricalQuery = {symbol: 'SPY', start:new Date('2018-01-01'),end: new Date('2021-01-01')}):Promise<string> {
  return new Promise(resolve => {
    const cacheKey = JSON.stringify(query);
    const ret = localCache().getItem(cacheKey);
    const resolveFromServer = () => fetch(`https://query1.finance.yahoo.com/v7/finance/download/${query.symbol}?period1=${query.start.getTime() / 1000}&period2=${query.end.getTime() / 1000}&interval=1d&events=history&includeAdjustedClose=true`)
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


interface HistoricalQuery {
  start: Date;
  end: Date;
  symbol: string;
}

/** Retrieves an item from local storage based on key, or if not present, resolves the value and puts */
function memoizeLocalStorage<T>(key:string, resolver:() => T):T {
  const ret = this.getItem(key) ?? resolver();
  this.setItem(key, ret);

  return ret;
}

//const symbol ='DOGE-USD';
// 2016 vs 1998
export function createHistoricalLeverageRuns(leverage, query: HistoricalQuery = {symbol: 'SPY', start:new Date('2016-01-01'),end: new Date('2021-01-01')}):Promise<c3.Data> {
    
    return toHistoricalSeries(fetchSymbol(query)).then(resp =>{
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
      });
      /*
    spy.then(resp => {
      resp.reverse();
      const printed = resp.map(row => ([row.date,row.change,row.abs_change, row.spread].join(',')));


      console.log(JSON.stringify(printed.slice(0,10),null,4));
    }); 
    */
}

const TRADING_DAYS_PER_YEAR = 250;
const YEARS_OF_RETIREMENT = 60;
// time vs investment vs withdrawal vs confidence
export function createPolicyConfidenceCurve(leverage = .75, yearsOfRetirement = YEARS_OF_RETIREMENT) {
  // default policy is a % allocation of stocks and % withdrawal rate
  // 45-60 years, 60 years for now
  // 50%-75%, 60% for now
  // 0%-5%, ??? whatever is the 95% confidence
  // 95%, 0-1


  // nest egg starting value is 1.
const query: HistoricalQuery = {symbol: 'SPY', start:new Date('1998-01-01'),end: new Date('2021-01-01')};

  // roll forward 100(0) simulations of a 75% invested portfolio for 60 years with withdrawal 1-10%
  const spy = toHistoricalSeries(fetchSymbol(query));
  return spy.then(resp =>{

    return new Array(9).fill(0).map((n,i) => {
      // convert to decimal
      return (i+1) / 100;
    }).map(withdrawal => {
      const numSimulations = 100;
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
        //simulations,
        confidence,
      };

    });
    
  });
  // find the confidence of 95%, what did the nest egg need to be

  // roll forward 100(0) simulations of a 75% invested portfolio for 60 years with withdrawal 1-10%
  // find the confidence of 95%, what did the nest egg need to be

}

 

// randomly samples values from a series
function sampleSeries( series: Record[], periods: number = TRADING_DAYS_PER_YEAR * YEARS_OF_RETIREMENT) {
  return new Array(periods).fill(0).map(() => {
    const sample = series[Math.floor(Math.random() * series.length)];
    return sample;
  });
}