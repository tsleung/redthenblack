import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { ImageAssetService } from '../services/image-asset.service';

@Component({
  selector: 'app-maya-calculator',
  templateUrl: './maya-calculator.component.html',
  styleUrls: ['./maya-calculator.component.scss']
})
export class MayaCalculatorComponent {
  constructor(
    public muxs: MayaUserExperienceService,
    public imageAssetService: ImageAssetService,
    public routingService: RoutingService,
  ){

  }
}
