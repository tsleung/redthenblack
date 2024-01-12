import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { ImageAssetService } from '../services/image-asset.service';

@Component({
  selector: 'app-splash-intro',
  templateUrl: './splash-intro.component.html',
  styleUrls: ['./splash-intro.component.scss']
})
export class SplashIntroComponent {
  constructor(
    readonly routingService: RoutingService,
    readonly images: ImageAssetService,
  ){

  }

}
