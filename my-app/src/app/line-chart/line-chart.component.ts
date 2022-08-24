
import {AfterViewInit, Component, OnInit, Input, OnChanges} from '@angular/core';
//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/c3/index.d.ts
import * as c3 from 'c3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges,AfterViewInit{
  chart: c3.ChartAPI;
  chartId;
  @Input() type:c3.ChartType = 'line';
  @Input() chartData:c3.Data = {
    columns: [],
    types:{},
  }

  @Input() gridOptions:c3.GridOptions = {
  }

  @Input() legend:c3.LegendOptions = {   
    show: true
  }

  constructor() {
    this.chartId = `chart-injected-${Date.now()}-${Math.round(Math.random() * 100)}`;
  }

  ngOnInit(): void {
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
        type:this.type,
        labels: false
      },
      point: {show: false},
      grid: this.gridOptions,
      legend: this.legend,
      tooltip: {grouped: false},
    });

    // console.log('generating chart', this.chartData);
    this.updateChart();
  }
  
  private bindChart() {
    this.chart = this.chart ?? c3.generate({ 
      bindto: `#${this.chartId}`,
      data: {
        x: 'x',
        columns: [],
        labels: false
      },
      legend: this.legend,
      tooltip: {grouped: false},
    });

    return this.chart;
  }

  private updateChart() {  
    this.chart.load({
      unload: true,
      columns: this.chartData.columns,
      types: this.chartData.types,
      type: this.chartData.type,
      xs: this.chartData.xs,
    });
    // console.log('updating chart', this.chartData)
  }

}
