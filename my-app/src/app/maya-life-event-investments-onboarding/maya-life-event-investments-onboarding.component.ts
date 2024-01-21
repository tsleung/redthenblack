import { Component } from '@angular/core';
import { RoutingService } from '../services/routing.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maya-life-event-investments-onboarding',
  templateUrl: './maya-life-event-investments-onboarding.component.html',
  styleUrls: ['./maya-life-event-investments-onboarding.component.scss']
})
export class MayaLifeEventInvestmentsOnboardingComponent {
  controls = {
    cash: new FormControl<number>(1e4),
    assets: new FormControl<number>(60),
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

      // this component should demonstrate the last 30 years of real effects on cash and stocks
      // historical data of 30 years should be applied
      // assumption effects should be (1) inflation rate (2) interest rate (savings) (3) sp500 performance 50/50 portfolio
      // radio buttons (1) for cash in cash, or cash in a savings account (2) 50/50 portfolio, 100/0 portfolio

      // there should be a table of 30 years of historical performance for reference, open in new tab

      console.log('building data', this.form.value)

      this.router.navigate([this.routingService.mapper.createMayaInvestingAdditional()]);
    }
}
