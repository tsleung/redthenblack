import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {OptimizationObjective} from '../services/find-my-retirement.service';
import {createLeverageParameterCollectionRoute, createWorkingParameterCollectionRoute, createRetirementParameterCollectionRoute} from '../utils/route_mapper';

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

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor() { }

  recommendations:Observable<Recommendation[]> = of([
    {text: 'Increase income or savings leverage',
    href: createWorkingParameterCollectionRoute(),},
    {text: 'Increase time working', 
      href: createWorkingParameterCollectionRoute(),},
    {text: 'Decrease time in retirement',
    href: createRetirementParameterCollectionRoute(),},
    {text: 'Optimal leverage to increase value', 
      href: createLeverageParameterCollectionRoute(),},
  ]);

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