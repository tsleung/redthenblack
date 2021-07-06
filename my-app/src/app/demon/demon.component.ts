import { Component, OnInit } from '@angular/core';
import {createRuns} from './demon-utils';

@Component({
  selector: 'app-demon',
  templateUrl: './demon.component.html',
  styleUrls: ['./demon.component.scss']
})
export class DemonComponent implements OnInit {
  
leverage = .8;
sample1 = {columns:[
  // ['data1', 30, 200, 100, 400, 150, 250],
  // ['data2', 50, 20, 10, 40, 15, 25],
  // ['data3', .50, .20, .10, .40, .15, .25]
]};

  constructor() {
    this.runNow(1);
  }

  updateLeverage(val) {
    console.log('lev',val);
    this.leverage = val;
    this.runNow(val);
  
  }

  runNow(leverage) {
    createRuns(leverage).then(data => {
      this.sample1 = data;
    });
  }

  ngOnInit(): void {
  }

}