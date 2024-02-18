import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { ImageAssetService } from '../services/image-asset.service';


@Component({
  selector: 'app-maya-card-selection',
  templateUrl: './maya-card-selection.component.html',
  styleUrls: ['./maya-card-selection.component.scss']
})
export class MayaCardSelectionComponent {

  constructor(readonly routingService: RoutingService,
    protected muxs: MayaUserExperienceService,
    protected imageAssetService: ImageAssetService,
  ) { 
  }
}

