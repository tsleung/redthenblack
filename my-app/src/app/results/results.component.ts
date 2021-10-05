import { Component ,AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {combineLatest, Observable, Subject} from 'rxjs';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import { Location } from '@angular/common'
import { RoutingService } from '../services/routing.service';
import { map } from 'rxjs/operators';

export interface ResultsRouteData {
  href: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit{
  visiblePreferences = this.route.queryParams.pipe(map(params => {
    console.log('params',params)
    return Object.keys(params).filter(key => {
      console.log('pre check', key)
      return this.findMyRetirementService.retirementPreferences[key];
    }).map(key => {
      console.log('visible pre',key)
      return {
        key:this.findMyRetirementService.toFriendlyName(key), 
        value: this.findMyRetirementService.retirementPreferences[key]
      };
    });
  }));
  parameters = this.route.data as Observable<ResultsRouteData>;

  ready = new Subject<void>();
  retirement = combineLatest([this.ready,this.findMyRetirementService.retirement]).pipe(map(([ready,val]) => val));
  working = combineLatest([this.ready,this.findMyRetirementService.working]).pipe(map(([ready,val]) => val));
  constructor(private route: ActivatedRoute,
    private router: Router,
    readonly findMyRetirementService:FindMyRetirementService, 
    readonly routingService: RoutingService,
    readonly location: Location) {
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
