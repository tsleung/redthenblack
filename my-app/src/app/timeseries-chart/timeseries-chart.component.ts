import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';

const DEFAULT_CHART_CONFIG = {
  bindto: '#chart',
  data: {
    columns: [],
    labels: false
  },
};

@Component({
  selector: 'app-timeseries-chart',
  templateUrl: './timeseries-chart.component.html',
  styleUrls: ['./timeseries-chart.component.scss']
})
export class TimeseriesChartComponent implements OnInit {
  accountChart: c3.ChartAPI;
  chartId = 'chartId';

  constructor() {
    this.chartId = `chart-injected-${Date.now()}`;

  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.accountChart = c3.generate({ ...DEFAULT_CHART_CONFIG, bindto: `#${this.chartId}` });
    this.accountChart.load({
      columns: [
        ['Series to track', 1],
      ],
    });
  }

}
