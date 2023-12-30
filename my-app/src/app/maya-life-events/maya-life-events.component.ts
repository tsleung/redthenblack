import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { LifestreamService } from '../services/lifestream.service';

import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MayaLifeEventsResultsComponent } from '../maya-life-events-results/maya-life-events-results.component';
import { RoutingService } from '../services/routing.service';


@Component({
  selector: 'app-maya-life-events',
  templateUrl: './maya-life-events.component.html',
  styleUrls: ['./maya-life-events.component.scss']
})
export class MayaLifeEventsComponent {

  constructor(
    readonly routingService: RoutingService,
    readonly lifeEventsService: LifeEventsService,
    readonly lifestreamService: LifestreamService,
    private _bottomSheet: MatBottomSheet,
    ) {}
    openBottomSheet(): void {
      this._bottomSheet.open(MayaLifeEventsResultsComponent, {
        panelClass: 'full-width'
      });
      
    }
  
}
