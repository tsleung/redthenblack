import { Input, Component} from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-multiple-line-chart',
  templateUrl: './multiple-line-chart.component.html',
  styleUrls: ['./multiple-line-chart.component.scss']
})
export class MultipleLineChartComponent{

  @Input() chartData:c3.Data = {
    columns: [
    ],
    type: 'line'
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
      grid: {
        y: {
            lines: [
                {value: 0},
            ]
        }
      },
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
