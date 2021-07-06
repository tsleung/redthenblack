
interface Record {
    date: Date;
    open: Number;
    high: Number;
    low: Number;
    close: Number;
    adj_close: Number;
    volume: Number;
    spread: Number;
    change: Number;
    abs_change: Number;
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

export function fetchSymbol(symbol: string, start = new Date('1995-01-01').getTime() / 1000, end = new Date('2020-01-01').getTime() / 1000) {
    return fetch(`https://query1.finance.yahoo.com/v7/finance/download/${symbol}?period1=${start}&period2=${end}&interval=1d&events=history&includeAdjustedClose=true`)
    .then(a=> a.text())
  }
  
export function createRun(resp, leverage) {
    return resp.reduce((accum, record) => {
        const previousBalance = accum[accum.length-1];
        const newBalance = previousBalance * (((record.change-1) * leverage)+1);
        accum.push(newBalance);
        return accum;
    },[1]);
}

// replace with actual cache
let runCache:undefined|Promise<Record[]> = undefined;
export function createRuns(leverage) {
    console.log('init');
    const symbol ='SPY';
    //const symbol ='DOGE-USD';
    runCache = runCache ?? toHistoricalSeries(fetchSymbol(symbol, 
      new Date('2016-01-01').getTime() / 1000 , 
      new Date('2021-01-01').getTime() / 1000));
    
    return runCache.then(resp =>{
        return {
          columns: [
            ['.5',...createRun(resp, .5)],
            ['1',...createRun(resp, 1)],
            ['1.5',...createRun(resp, 1.5)],
            ['2',...createRun(resp, 2)],
            ['2.5',...createRun(resp, 2.5)],
            ['3.0',...createRun(resp, 3)],
            ['4.0',...createRun(resp, 4)],
            ['spy',...createRun(resp, leverage)]
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