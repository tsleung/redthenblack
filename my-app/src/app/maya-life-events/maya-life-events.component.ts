import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { LifestreamService } from '../services/lifestream.service';

import {
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { MayaLifeEventsResultsComponent } from '../maya-life-events-results/maya-life-events-results.component';
import { RoutingService } from '../services/routing.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { ImageAssetService } from '../services/image-asset.service';

@Component({
  selector: 'app-maya-life-events',
  templateUrl: './maya-life-events.component.html',
  styleUrls: ['./maya-life-events.component.scss']
})
export class MayaLifeEventsComponent {



  promptNumberOfYears() {
    const numYears = Number(window.prompt('Number of Years', '60'));
    if(!isNaN(numYears)) {
      this.muxs.numberOfPeriods = numYears;
    }
  }
  
  promptNumberOfSimulations() {
    const numSims = Number(window.prompt('Number of Simulations', '200'));
    if(!isNaN(numSims)) {
      this.muxs.numberOfSimulations = numSims;
    }
  }

  constructor(
    readonly routingService: RoutingService,
    readonly lifeEventsService: LifeEventsService,
    readonly lifestreamService: LifestreamService,
    private _bottomSheet: MatBottomSheet,
    readonly muxs: MayaUserExperienceService,
    readonly images: ImageAssetService
    ) {}
    openBottomSheet(): void {
      this._bottomSheet.open(MayaLifeEventsResultsComponent, {
        panelClass: 'full-width'
      });
      
    }
    
    
    ngAfterViewInit() {
      
      if(!runOnce) {
        console.log('adding life evnts')
        runOnce = true;
        this.lifeEventsService.availableLifeEvents.slice(0,2).forEach(lifeEvent => {
          this.lifeEventsService.addLifeEvent(lifeEvent);
        });
        
      }
      
    } 
}

let runOnce = false;