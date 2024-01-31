import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { LifeEvent } from '../utils/life-event-utils';
import { map, startWith, switchMap } from 'rxjs/operators';
import { createLifeEventsRoute } from '../utils/route_mapper';
import { FormControl, FormGroup } from '@angular/forms';
import { calculateAmortizationPayment } from '../third_party/models/amortization';
import { AmortizedLoan } from '../utils/maya-ecs-components';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-add-loan-life-event',
  templateUrl: './add-loan-life-event.component.html',
  styleUrls: ['./add-loan-life-event.component.scss']
})
export class AddLoanLifeEventComponent {

  controls = {
    loanAmount: new FormControl<number>(240e3),
    loanTerm: new FormControl<number>(30),
    interestRate: new FormControl<number>(.07469),
    payment: new FormControl<number>(1673),
    startPeriod: new FormControl<number>(0),
  }

  form = new FormGroup(this.controls);

  calculatedLoanPayment = combineLatest([
    this.controls.loanAmount.valueChanges,
    this.controls.loanTerm.valueChanges.pipe(startWith(30)),
    this.controls.interestRate.valueChanges,
  ]).pipe(
    map(([
    loanAmount, 
    loanTerm,
    interestRate,
  ]) => {
    
    console.log('calculating payment')
    
    const monthlyPayment =  Math.round(calculateAmortizationPayment(
      interestRate / 12, 
      loanTerm * 12, 
      loanAmount
    ));

    this.controls.payment.setValue(monthlyPayment);

    return monthlyPayment;
  }));

  // the difference with targeted components is they 
  // can expose component and life event attributes
  lifeEvent = this.route.params.pipe(map((params) => {
    const componentKey = params.type ?? 'custom';
    const lifeEvent: LifeEvent = this.lifeEventsService.availableLifeEvents.find(suspect => {
      console.log('componentKey/type', componentKey)

      return suspect.componentKey === componentKey;
    });
    return lifeEvent;
  }),
    switchMap(lifeEvent => {
      // override defaults from add, if applicable
      return this.muxs.components.pipe(map(components => {
        // in each field, overwrite if there is a component available

        const component:AmortizedLoan = Array.from(components.values())
          .find(suspect => suspect.key === lifeEvent.componentKey) as AmortizedLoan ?? lifeEvent.createComponent() as AmortizedLoan;
        this.controls.interestRate.setValue(component.interestRate);
        this.controls.loanAmount.setValue(component.principal);

        return this.createViewModel(lifeEvent, component);
      }));
    })
  );


  private createViewModel(lifeEvent:LifeEvent, component: AmortizedLoan) {
    const saveLoan = () => {
      
      component.interestRate = this.controls.interestRate.value;
      component.principal = this.controls.loanAmount.value;
      component.monthlyPayment = this.controls.payment.value;
      
      this.muxs.addComponent.next(component);
      console.log('saving loan', component);
      
      this.router.navigate([createLifeEventsRoute()]);
    };

    return {
      ...lifeEvent,
      saveLoan,
    };
  }
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private readonly lifeEventsService: LifeEventsService,
    private readonly muxs: MayaUserExperienceService,
  ) { }


  saveForm(e, lifeEvent: LifeEvent) {
    e.preventDefault();
    e.stopPropagation();

    const data = new FormData(e.target);

    lifeEvent.fields.forEach(field => {
      field.value = data.get(field.name).valueOf() as string;
    });





    this.lifeEventsService.updateLifeEvent(lifeEvent);
    this.router.navigate([createLifeEventsRoute()]);
    return false;
  }
}
