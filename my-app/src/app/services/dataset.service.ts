import { Injectable } from '@angular/core';
import {Record, HistoricalQuery, toHistoricalSeries, fetchSymbol} from '../utils/series';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor() { }

  fetchSP500() {
    return fetchSymbol();
  }
}

export function sp500DatasetResolver(datasetService: DatasetService) {
  return new Observable(subscribe => {
    toHistoricalSeries(datasetService.fetchSP500()).then(results => {
      const records = results.map(record => ([
        new Date(record.date).toLocaleDateString(), 
        record.change]));

      subscribe.next(records.reverse());
    }).then(() => {
      subscribe.complete();
    });
  });
}
