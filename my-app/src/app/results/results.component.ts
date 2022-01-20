import { Component ,AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {combineLatest, Observable, Subject} from 'rxjs';
import { FindMyRetirementService } from '../services/find-my-retirement.service';

import { RoutingService } from '../services/routing.service';
import { map } from 'rxjs/operators';

export interface ResultsRouteData {
  href: string;
  showNavigation: boolean;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit{
  
  parameters = this.route.data as Observable<ResultsRouteData>;

  ready = new Subject<void>();
  showNavigation:Observable<boolean> = this.parameters.pipe(map(parameters => parameters.showNavigation ?? true));
  visiblePreferences = combineLatest([this.showNavigation, this.route.queryParams]).pipe(map(([showNav,params]) => {
    return showNav && Object.keys(params).filter(key => {
      return this.findMyRetirementService.retirementPreferences[key];
    }).map(key => {
      return {
        key:this.findMyRetirementService.toFriendlyName(key), 
        value: this.findMyRetirementService.retirementPreferences[key]
      };
    });
  }));

  retirement = combineLatest([this.ready,this.showNavigation,this.findMyRetirementService.retirement]).pipe(map(([ready,showNavigation, val]) => ({...val, showNavigation})));

  working = combineLatest([this.ready,this.showNavigation,this.findMyRetirementService.working]).pipe(map(([ready,showNavigation, val]) => ({...val, showNavigation})));
  
  workingSummary = combineLatest([this.ready,this.showNavigation,this.findMyRetirementService.workingSummary]).pipe(map(([ready,showNavigation, val]) => ({...val, showNavigation})));
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    readonly findMyRetirementService:FindMyRetirementService, 
    readonly routingService: RoutingService) {
  }

  toFriendlyText(text: string) {
    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }

  navigateToSummary() {
    this.parameters.subscribe((params) => {
      this.router.navigate([params.href]);
    }).unsubscribe();
  }

  ngAfterViewInit(){
    this.ready.next();
    //this.findMyRetirementService.updateMarketLeverage();
    //this.findMyRetirementService.createPolicyConfidenceCurve();
    setTimeout(() => {
      this.findMyRetirementService.updateRetirementPreferences({});
    }, 1); 
  }  
}


