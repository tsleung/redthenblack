import { Component } from '@angular/core';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { RoutingService } from '../services/routing.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { SavingsAccount, Stocks } from '../utils/maya-ecs-components';

@Component({
  selector: 'app-maya-life-event-assets-onboarding',
  templateUrl: './maya-life-event-assets-onboarding.component.html',
  styleUrls: ['./maya-life-event-assets-onboarding.component.scss']
})
export class MayaLifeEventAssetsOnboardingComponent {
  controls = {
    cash: new FormControl<number>(50e3),
    assets: new FormControl<number>(250e3),
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


      const savingsAccount = new SavingsAccount(this.controls.cash.value, [1.05]);
      this.muxs.addComponent.next(savingsAccount);

      const stocks = new Stocks(this.controls.assets.value, [1.1,1.1,1.1,1.1,.75]);
      this.muxs.addComponent.next(stocks);

      console.log('building data', this.form.value)

      this.router.navigate([this.routingService.mapper.createLifeEventsRoute()]);
    }
}
