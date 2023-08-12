import { Component,Input, OnInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  @Input() chartData:c3.Data = {
    columns: [
    ],
    type: 'bar'
  }
  
  @Input() gridOptions:c3.GridOptions = {
  }

  chartId;
  chart: c3.ChartAPI;
  
  constructor() {
    this.chartId = `chart-injected-${Date.now()}-${Math.round(Math.random() * 100)}`;
  }

  private createChart() {
    return c3.generate({ 
      bindto: `#${this.chartId}`,
      data: this.chartData,
      bar: {
        width: {
          ratio:.2
        }
      },
      grid: this.gridOptions ?? {
        y: {
            lines: [
                {value: 0},
            ]
        }
      },
      // this can be made a separate input
      axis: {
        y2: {
            show: true
        }
      }
    });
  }

  ngOnChanges() {
    this.createChart();
  }

  ngAfterContentInit() {
    setTimeout(() => this.createChart(), 1);
    this.chart = this.chart ?? this.createChart();    
  }
}
