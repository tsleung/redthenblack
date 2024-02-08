import { Component, Input } from '@angular/core';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-maya-life-simulation-results-chart',
  templateUrl: './maya-life-simulation-results-chart.component.html',
  styleUrls: ['./maya-life-simulation-results-chart.component.scss']
})
export class MayaLifeSimulationResultsChartComponent {

  thresholdsChartData: Observable<c3.Data>;
  @Input() thresholds = {target: .5, safety: .05, reach: .65};
  ngOnChanges() {

    // maybe this should come from muxs or lifeeventservice, local for now
    this.thresholdsChartData = this.muxs.percentileSortedSimulations.pipe(
      filter(results => results.length > 0),
      map(results => {

      const chartData: c3.Data = {
        columns: [],
        type: 'line',
        colors: {
          'Target': '#96BAFA',
          'Safety': '#6CD851',
          'Reach': '#FD5053'
        },
      };

      chartData.columns.push([`Target`, ...fetchPercentile(this.thresholds.target, results)]);
      chartData.columns.push([`Safety`, ...fetchPercentile(this.thresholds.safety, results)]);
      chartData.columns.push([`Reach`, ...fetchPercentile(this.thresholds.reach, results)]);
      
      console.log('adding chart data', this.thresholds, chartData)
      
      return chartData;
    }));

    function fetchPercentile<T>(threshold: number, results:T[]): T {
      const index = Math.floor(results.length * threshold);
      console.log('fetching percentile', results.length, threshold, index)
      return results[index === results.length ? index - 1 : index];
    }

  }
  gridOptions: c3.GridOptions = {
    y: {
      lines: [
        { value: 0 },
      ]
    }
  };
  chartData = this.muxs.simulationsBalances.pipe(map(results => {
    const chartData: c3.Data = {
      columns: [],
      type: 'line'
    };

    results.slice(0, 100).forEach((simulation, i) => {
      chartData.columns.push([`series ${i}`, ...simulation])
    });

    // console.log('adding chart data',chartData)
    return chartData;
  }));

  percentilesChartData = this.muxs.percentileSortedSimulations.pipe(
    filter(results => results.length > 0),
    map(results => {

    const chartData: c3.Data = {
      columns: [],
      type: 'line'
    };

    const thresholds = [
      .05, .16, .25, .5, .75, .84, .95
    ];
    results = thresholds.map(threshold => {
      const index = Math.floor(results.length * threshold);
      return results[index];
    });

    results.forEach((simulation, i) => {
      chartData.columns.push([`${thresholds[i] * 100} percentile`, ...simulation])
    });

    console.log('adding chart data', chartData)
    return chartData;
  }));




  constructor(private muxs: MayaUserExperienceService) { }
}
