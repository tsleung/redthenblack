import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {RecommendationSummary, Recommendation, RecommendationService} from '../services/recommendation.service';

export interface SummaryRouteData {
  
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  constructor(private recommendationService: RecommendationService) { }

  valueRecommendations = this.recommendationService.valueRecommendations;
  timeRecommendations = this.recommendationService.timeRecommendations;
  confidenceRecommendations = this.recommendationService.confidenceRecommendations;
}
