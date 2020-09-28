import { Component, OnInit, Input, OnChanges} from '@angular/core';
//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/c3/index.d.ts
import * as c3 from 'c3';

@Component({
  selector: 'timeseries-chart',
  templateUrl: './timeseries-chart.component.html',
  styleUrls: ['./timeseries-chart.component.scss']
})
export class TimeseriesChartComponent implements OnInit, OnChanges{
  accountChart: c3.ChartAPI;
  chartId;
  @Input() chartData:c3.Data = {
    columns: [],
    types:{},
  }

  constructor() {
    this.chartId = `chart-injected-${Date.now()}-${Math.round(Math.random() * 100)}`;
  }

  ngOnInit(): void {
  }

  bindAccountChart() {
    this.accountChart = this.accountChart ?? c3.generate({ 
      bindto: `#${this.chartId}`,
      data: {
        columns: [],
        labels: false
      }
    });

    return this.accountChart;
  }

  ngOnChanges() {
    this.accountChart = this.bindAccountChart();

    this.updateChart();
  }
  
  ngAfterViewInit() {
    this.accountChart = c3.generate({ 
      bindto: `#${this.chartId}`,
      data: {
        columns: [],
        labels: false
      }
    });

    this.updateChart();
  }
  
  updateChart() {  
    this.accountChart.load({
      columns: this.chartData.columns,
      types: this.chartData.types,
      type: this.chartData.type,
      xs: this.chartData.xs,
    });
  }

}
