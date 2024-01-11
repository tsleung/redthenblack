import { Component } from '@angular/core';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

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

    return chartData;
  }))

  gridOptions: c3.GridOptions = {};
  constructor(private muxs: MayaUserExperienceService) { }
}
