import { Component } from '@angular/core';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-maya-life-simulation-results-chart',
  templateUrl: './maya-life-simulation-results-chart.component.html',
  styleUrls: ['./maya-life-simulation-results-chart.component.scss']
})
export class MayaLifeSimulationResultsChartComponent {
  chartData = this.muxs.simulationsBalances.pipe(map(results => {
    const chartData: c3.Data = {
      columns: [],
      type: 'line'
    };  
    
    results.forEach((simulation, i) => {
      chartData.columns.push([`series ${i}`, ...simulation])
    });

    // console.log('adding chart data',chartData)
    return chartData;
  }));

  thresholdsChartData = this.muxs.percentileSortedSimulations.pipe(map(results => {

    const chartData: c3.Data = {
      columns: [],
      type: 'line'
    };  
    
    const thresholds = [
      .025, .16, .25, .5, .75, .84, .975
    ];
    results = thresholds.map(threshold => {
      const index = Math.floor(results.length * threshold);
      return results[index];
    });

    results.forEach((simulation, i) => {
      chartData.columns.push([`${thresholds[i]} percentile`, ...simulation])
    });

    console.log('adding chart data',chartData)
    // create an observable that looks at the thresholds, do median for now
    return chartData;
    
  }));

  gridOptions: c3.GridOptions = {};
  constructor(private muxs: MayaUserExperienceService) { }
}
