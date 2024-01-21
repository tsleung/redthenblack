import { Component } from '@angular/core';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { RoutingService } from '../services/routing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CostOfLiving, Job, Traditional401k, Traditional401kContribution } from '../utils/maya-ecs-components';

@Component({
  selector: 'app-maya-life-event-building-onboarding',
  templateUrl: './maya-life-event-building-onboarding.component.html',
  styleUrls: ['./maya-life-event-building-onboarding.component.scss']
})
export class MayaLifeEventBuildingOnboardingComponent {
  controls = {
    savings: new FormControl<number>(20e3),
    income: new FormControl<number>(100e3),
    retirement: new FormControl<number>(30),
    investments: new FormControl<number>(20e3),
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
      // annual savings, income, how long in retirement account
      this.muxs.periodsUntilRetirement = this.controls.retirement.value;

      const job = new Job();
      job.cashFlow = this.controls.income.value;
      job.periods = this.controls.retirement.value;
      this.muxs.addComponent.next(job);

      const col = new CostOfLiving();
      col.cashFlow = -1 * (this.controls.income.value - this.controls.savings.value);
      col.periods = this.controls.retirement.value;
      this.muxs.addComponent.next(col);

      const traditional401k = new Traditional401k(this.controls.investments.value, [1.1]);
      this.muxs.addComponent.next(traditional401k);

      const traditional401kContribution = new Traditional401kContribution(
        this.controls.investments.value,
        this.controls.retirement.value,
      );
      // this.muxs.addComponent.next(traditional401kContribution);

      
      console.log('building data', this.form.value)

      
      
      this.router.navigate([this.routingService.mapper.createMayaNestEgg()]);
    }
}
