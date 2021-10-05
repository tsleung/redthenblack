import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {RecommendationSummary, Recommendation, RecommendationService} from '../services/recommendation.service';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import { SummaryService } from '../services/summary.service';

export interface SummaryRouteData {
  
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements AfterViewInit {
  recommendations = this.recommendationService.recommendations;
  valueRecommendations = this.recommendationService.valueRecommendations;
  timeRecommendations = this.recommendationService.timeRecommendations;
  confidenceRecommendations = this.recommendationService.confidenceRecommendations;

  constructor(private recommendationService: RecommendationService,
    readonly findMyRetirementService:FindMyRetirementService,
    readonly summaryService: SummaryService,
    ) { }

    ngAfterViewInit() {
      //this.findMyRetirementService.updateRetirementPreferences({});
      setTimeout(() => {
        this.findMyRetirementService.updateRetirementPreferences({});
      }, 1);
    }

}
