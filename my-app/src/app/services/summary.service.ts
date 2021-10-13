import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  summary;
  constructor() { 
    this.summary = of({
      time: '5',
      confidence: '95%',
      value: '1.2M',
    });


  }
}
