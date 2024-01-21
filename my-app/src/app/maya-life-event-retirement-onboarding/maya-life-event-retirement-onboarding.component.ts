import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { RetirementSpend } from '../utils/maya-ecs-components';

@Component({
  selector: 'app-maya-life-event-retirement-onboarding',
  templateUrl: './maya-life-event-retirement-onboarding.component.html',
  styleUrls: ['./maya-life-event-retirement-onboarding.component.scss']
})
export class MayaLifeEventRetirementOnboardingComponent {
  controls = {
    monthlyRetirementSpend: new FormControl<number>(3e3),
    retirement: new FormControl<number>(30),
  }

  form = new FormGroup(this.controls);
  constructor(
    readonly muxs: MayaUserExperienceService, 
    private router: Router,
    readonly routingService: RoutingService
    ) {}

    saveForm(e) {
      e.preventDefault();
      e.stopPropagation();
      this.muxs.periodsOfRetirement = this.controls.retirement.value;

      const annualRetirementSpend = 12 * this.controls.monthlyRetirementSpend.value;
      const retirementSpend = new RetirementSpend();
      retirementSpend.startPeriod = this.muxs.periodsUntilRetirement;
      retirementSpend.periods = this.controls.retirement.value;
      retirementSpend.cashFlow = annualRetirementSpend * -1;
      this.muxs.addComponent.next(retirementSpend);

      

      console.log('building data', this.form.value)
      this.router.navigate([this.routingService.mapper.createMayaInvestingAdditional()]);
      // this.router.navigate([this.routingService.mapper.createMayaInvesting()]);
    }
}
