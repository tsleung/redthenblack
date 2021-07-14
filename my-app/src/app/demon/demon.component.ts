import { Component, OnInit } from '@angular/core';
import {createHistoricalLeverageRuns} from './demon-utils';
import {findMyRetirement} from './find-my-retirement';


@Component({
  selector: 'app-demon',
  templateUrl: './demon.component.html',
  styleUrls: ['./demon.component.scss']
})
export class DemonComponent implements OnInit {
  
leverage = .8;
marketLeverage:c3.Data = {columns:[
  // ['data1', 30, 200, 100, 400, 150, 250],
  // ['data2', 50, 20, 10, 40, 15, 25],
  // ['data3', .50, .20, .10, .40, .15, .25]
]};
withdrawalConfidence:c3.Data = {columns:[
  // ['data1', 30, 200, 100, 400, 150, 250],
  // ['data2', 50, 20, 10, 40, 15, 25],
  // ['data3', .50, .20, .10, .40, .15, .25]
]};

withdrawalConfidenceGridOptions:c3.GridOptions = {
  y: {
    lines: [
        {value: .95, text: '95% confidence'},
        {value: .85, text: '80% confidence'},
        {value: .5, text: '50% confidence'},
    ]
  }
}

  constructor() {
    this.updateMarketLeverage();
    this.findMyRetirement();
  }

  editLeverage() {
    const val = Number(window.prompt("Leverage", `${this.leverage}`)) ?? this.leverage;
    this.updateLeverage(val);
  }
  updateLeverage(val) {
    console.log('lev',val);
    this.leverage = val;
    this.updateMarketLeverage();
    this.findMyRetirement();
  
  }

  updateMarketLeverage() {
    createHistoricalLeverageRuns(this.leverage).then(data => {
      this.marketLeverage = data;
    });
  }

  findMyRetirement() {
    Promise.all([
      findMyRetirement(this.leverage, 30),
      findMyRetirement(this.leverage, 45),
      findMyRetirement(this.leverage, 60),
    ]).then(([short, medium, long]) => {
      console.log('mediumm retirement', medium);
      this.withdrawalConfidence = {
        x:'x',
        columns: [
          ['x', ...short.map(result => result.withdrawal)],
          ['30 years', ...short.map(result => result.confidence)],
          ['45 years', ...medium.map(result => result.confidence)],
          ['60 years', ...long.map(result => result.confidence)],
        ]
      }
    });
  }

  updateWithdrawalConfidence() {

  }

  ngOnInit(): void {
  }

}