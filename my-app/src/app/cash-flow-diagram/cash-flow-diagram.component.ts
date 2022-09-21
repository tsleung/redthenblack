import { Component, OnInit, Input, OnChanges ,AfterViewChecked} from '@angular/core';
import * as c3 from 'c3';
import { firstValueOf, lastValueOf, prettyRoundNumber } from '../utils/learn_utils';



function identity<T>(x:T):T {
  return x;
}

function additive(addend:number) {
  return (previous: number):number => {
    return addend + previous;
  };
}

function multiplicative(factor:number) {
  return (previous: number):number => {
    return factor * previous;
  };
}

interface CashFlow {
  name: string;
  numberOfPeriods: number;
  // Modification of how to translate the previous to the next
  // Simple can be identity function, return the same. 
  modificationPerPeriod: (previous: number) => number;
}

@Component({
  selector: 'app-cash-flow-diagram',
  templateUrl: './cash-flow-diagram.component.html',
  styleUrls: ['./cash-flow-diagram.component.scss']
})
export class CashFlowDiagramComponent {

  @Input() cashFlow:number[] = []

  startingBalance: number;
  endingBalance: number;

  cashFlowChart:c3.Data = {
    columns: [
      ['Cash Flow']
    ],
    type: 'bar'
  } 

  balanceChart:c3.Data = {
    columns: [
      ['Balance']
    ],
    type: 'line'
  }

  combinedChart:c3.Data = {
    columns: [
    ],
    type: 'bar'
  }


  ngOnChanges(evt) {
    this.updateCharts();
  }

  constructor() {
    this.updateCharts();
  }

  updateCharts() {
    const updatedVals = convertCashFlowToChartData(this.cashFlow);
    this.startingBalance = firstValueOf(updatedVals.balanceChartData);
    this.endingBalance = lastValueOf(updatedVals.balanceChartData);

    this.cashFlowChart = {
      columns: [
        ['Cash Flow',...updatedVals.cashFlowChartData]
      ],
      type: 'bar'
    };
    
    this.balanceChart = {
      columns: [
        ['Balance',...updatedVals.balanceChartData]
      ],
      type: 'line',
      
    };

    this.combinedChart = {
      columns: [
        ['Cash Flow',...updatedVals.cashFlowChartData],
        ['Balance',...updatedVals.balanceChartData]
      ],
      type: 'line',
      types: {
        'Cash Flow': 'bar',
        'Balance': 'line',
      },
      axes: {
        'Cash Flow': 'y',
        'Balance': 'y2'
      }

    }
    
  }
}

function convertCashFlowToChartData(cashFlow) {
  return cashFlow.reduce((accum, val) => {
    accum.cashFlowChartData.push(val);
    
    const previousBalance = accum.balanceChartData[accum.balanceChartData.length-1] ?? 0;
    const updatedBalance = previousBalance + val;
    accum.balanceChartData.push(updatedBalance);

    return accum;

  },{cashFlowChartData:[], balanceChartData:[]});

}