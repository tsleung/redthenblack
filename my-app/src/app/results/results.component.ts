import { Component ,AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {combineLatest, Observable, Subject} from 'rxjs';
import { FindMyRetirementService } from '../services/find-my-retirement.service';
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

  parameters = this.route.data as Observable<ResultsRouteData>;

  ready = new Subject<void>();
  retirement = combineLatest([this.ready,this.findMyRetirementService.retirement]).pipe(map(([ready,val]) => val));
  working = combineLatest([this.ready,this.findMyRetirementService.working]).pipe(map(([ready,val]) => val));
  constructor(private route: ActivatedRoute,
    readonly findMyRetirementService:FindMyRetirementService) {
  }


  ngAfterViewInit(){
    this.ready.next();
    
    this.findMyRetirementService.updateMarketLeverage();
    this.findMyRetirementService.createPolicyConfidenceCurve();
    this.findMyRetirementService.updateRetirementPreferences({});
  }


  
}
