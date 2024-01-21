import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maya-life-event-savings-onboarding',
  templateUrl: './maya-life-event-savings-onboarding.component.html',
  styleUrls: ['./maya-life-event-savings-onboarding.component.scss']
})
export class MayaLifeEventSavingsOnboardingComponent {
  controls = {
    contributions: new FormControl<number>(1e4),
  }

  form = new FormGroup(this.controls);
  constructor(
    // readonly muxs: MayaUserExperienceService, 
    private router: Router,
    readonly routingService: RoutingService
    ) {}

    saveForm(e) {
      e.preventDefault();
      e.stopPropagation();

      // convert monthly contributions to annual savings
      console.log('building data', this.form.value)

      


      this.router.navigate([this.routingService.mapper.createMayaOnboardingNewbie()]);
    }
}
