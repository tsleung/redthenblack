
import {localCache} from './local_storage';

export interface HistoricalQuery {
  start: Date;
  end: Date;
  symbol: string;
}

export interface Record {
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


export function fetchSymbol(query: HistoricalQuery = {symbol: 'SPY', start:new Date('1998-01-01'),end: new Date('2021-01-01')}):Promise<string> {
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