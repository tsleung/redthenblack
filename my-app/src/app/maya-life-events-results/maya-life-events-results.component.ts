import { Component } from '@angular/core';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { ImageAssetService } from '../services/image-asset.service';
import { RoutingService } from '../services/routing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-maya-life-events-results',
  templateUrl: './maya-life-events-results.component.html',
  styleUrls: ['./maya-life-events-results.component.scss']
})
export class MayaLifeEventsResultsComponent {
  controls = {
    target: new FormControl<number>(.5),
    safety: new FormControl<number>(.05),
    reach: new FormControl<number>(.65),
  }

  form = new FormGroup(this.controls);

  thresholds = this.form.valueChanges.pipe(
    map(() => {
      return this.computeThresholds();
    }),
    startWith(this.computeThresholds())
  );

  computeThresholds() {
    return {
      target: this.controls.target.value,
      safety: this.controls.safety.value,
      reach: this.controls.reach.value,
    };
  }

  constructor(
    public lifeEventsService: LifeEventsService,
    public muxs: MayaUserExperienceService,
    public imageAssetService: ImageAssetService,
    public routingService: RoutingService,
  ) { }
}
