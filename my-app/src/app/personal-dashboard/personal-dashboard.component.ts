import { Component } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import {  map, tap } from 'rxjs/operators';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-personal-dashboard',
  templateUrl: './personal-dashboard.component.html',
  styleUrls: ['./personal-dashboard.component.scss']
})
export class PersonalDashboardComponent {
  ready = new Subject<void>();

  constructor(
    readonly routingService: RoutingService,
    readonly findMyRetirementService: FindMyRetirementService,
  ){

  }

  working = this.findMyRetirementService.working;
  working2 = combineLatest([
    this.ready,this.findMyRetirementService.working
  ]).pipe(
    map(([ready, val]) => ({...val})),
    tap(val =>console.log(val)),
  );

  ngAfterViewInit(){
    
    //this.findMyRetirementService.updateMarketLeverage();
    //this.findMyRetirementService.createPolicyConfidenceCurve();
    this.ready.next();
    this.findMyRetirementService.updateRetirementPreferences({});
  }  
}
