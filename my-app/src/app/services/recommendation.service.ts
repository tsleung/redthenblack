import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {OptimizationObjective} from '../services/find-my-retirement.service';
import {createParameterCollectionRoute} from '../utils/route_mapper';

// +/- X will +/- Y
// should save the last value optimized for

export interface RecommendationSummary {
  time: string;
  value: string;
  confidence: string;

}

export interface Recommendation {
  text: string;
  href: string;
}

@Injectable()
export class RecommendationService {

  constructor() { }

  recommendations:Observable<Recommendation[]> = of([
    {text: 'Increase time will increase value at retirement by VVV'},
    {text: 'Decreasing value will decrease time by TTT'},
    {text: 'Decreasing time will increase confidence at retirement by CCC'},
  ].map(r => ({...r,href: createParameterCollectionRoute()})));

  valueRecommendations = this.recommendations.pipe(
    map(selectByOptimization(OptimizationObjective.Value))
  );

  timeRecommendations = this.recommendations.pipe(
    map(selectByOptimization(OptimizationObjective.Time))
  );
  
  confidenceRecommendations = this.recommendations.pipe(
    map(selectByOptimization(OptimizationObjective.Confidence))
  );

}


function selectByOptimization(optimizationObjective: OptimizationObjective) {
  return (recommendations: Recommendation[]) => {
    return recommendations.filter(recommendation => {
      console.log(OptimizationObjective,optimizationObjective,OptimizationObjective[optimizationObjective])
      return recommendation.text.toLowerCase().includes(OptimizationObjective[optimizationObjective].toLowerCase());
    });        
  };
}