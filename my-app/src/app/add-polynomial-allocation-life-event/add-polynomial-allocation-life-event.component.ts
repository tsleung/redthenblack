import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { LifeEvent } from '../utils/life-event-utils';
import { map, startWith, switchMap } from 'rxjs/operators';
import { createLifeEventsRoute } from '../utils/route_mapper';
import { FormControl, FormGroup } from '@angular/forms';
import { calculateAmortizationPayment } from '../third_party/models/amortization';
import { Observable, combineLatest } from 'rxjs';
import { PolynomialAllocation } from '../utils/maya-ecs-components';
import { quadratic } from '../third_party/models/quadratic';

@Component({
  selector: 'app-add-polynomial-allocation-life-event',
  templateUrl: './add-polynomial-allocation-life-event.component.html',
  styleUrl: './add-polynomial-allocation-life-event.component.scss'
})
export class AddPolynomialAllocationLifeEventComponent {
  gridOptions: c3.GridOptions = {
    y: {
      lines: [
        { value: 0 },
      ]
    }
  };

  controls = {
    exponential: new FormControl<number>(0),
    linear: new FormControl<number>(0),
    constant: new FormControl<number>(0),
    startPeriod: new FormControl<number>(0),
    periods: new FormControl<number>(60),
  }

  form = new FormGroup(this.controls);

  polynomialChart = combineLatest([
    this.controls.exponential.valueChanges.pipe(startWith(0)),
    this.controls.linear.valueChanges.pipe(startWith(1)),
    this.controls.constant.valueChanges.pipe(startWith(0)),
    this.controls.startPeriod.valueChanges.pipe(startWith(0)),
    this.controls.periods.valueChanges.pipe(startWith(0)),
  ]).pipe(
    map(([
    exponential, 
    linear,
    constant,
    startPeriod,
    periods,
  ]) => {
    // generate a visual of this curve for all periods
    const seriesLength = this.controls.startPeriod.value+this.controls.periods.value;
    const series = new Array(seriesLength)
      .fill(0)
      .map((v,x) => {
        return quadratic(
          this.controls.exponential.value,
          this.controls.linear.value,
          this.controls.constant.value,
          x,
        );
      });

    const chartData: c3.Data = {
      columns: [
        ['polynomial', ...series],
      ],
      type: 'line',
    };

    return chartData;
  }));

  // the difference with targeted components is they 
  // can expose component and life event attributes
  lifeEvent = combineLatest([
    this.route.params,     
  ]).pipe(map(([params]) => {
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

        const component:PolynomialAllocation = Array.from(components.values())
          .find(suspect => suspect.key === lifeEvent.componentKey) as PolynomialAllocation ?? lifeEvent.createComponent() as PolynomialAllocation;
        
        this.controls.exponential.setValue(component.exponentialFactor);
        this.controls.linear.setValue(component.linearFactor);
        this.controls.constant.setValue(component.constant);
        this.controls.startPeriod.setValue(component.startPeriod);
        this.controls.periods.setValue(component.periods);

        lifeEvent.createFriendlyFieldDescription = () => '';
        return this.createViewModel(lifeEvent, component);
      }));
    })
  );

  private createViewModel(lifeEvent:LifeEvent, component: PolynomialAllocation) {
    const saveLoan = () => {
      
      component.exponentialFactor = this.controls.exponential.value;
      component.linearFactor = this.controls.linear.value;
      component.constant = this.controls.constant.value;
      component.startPeriod = this.controls.startPeriod.value;
      component.periods = this.controls.periods.value;
      
      this.muxs.addComponent.next(component);
      console.log('saving', component);
      
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
