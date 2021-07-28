
import { Component, OnInit, Input, OnChanges} from '@angular/core';
//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/c3/index.d.ts
import * as c3 from 'c3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges{
  chart: c3.ChartAPI;
  chartId;
  @Input() chartData:c3.Data = {
    columns: [],
    types:{},
  }

  @Input() gridOptions:c3.GridOptions = {
  }

  constructor() {
    this.chartId = `chart-injected-${Date.now()}-${Math.round(Math.random() * 100)}`;
  }

  ngOnInit(): void {
  }

  bindChart() {
    this.chart = this.chart ?? c3.generate({ 
      bindto: `#${this.chartId}`,
      data: {
        x: 'x',
        columns: [],
        labels: false
      }
    });

    return this.chart;
  }

  ngOnChanges() {
    this.chart = this.bindChart();
    this.updateChart();
  }
  
  ngAfterViewInit() {
    this.chart = c3.generate({ 
      bindto: `#${this.chartId}`,
      data: {
        x: 'x',
        columns: [],
        labels: false
      },
      point: {show: false},
      grid: this.gridOptions,
    });

    this.updateChart();
  }
  
  updateChart() {  
    this.chart.load({
      unload: true,
      columns: this.chartData.columns,
      types: this.chartData.types,
      type: this.chartData.type,
      xs: this.chartData.xs,

    });
    console.log('updating chart', this.chartData)
  }

}
