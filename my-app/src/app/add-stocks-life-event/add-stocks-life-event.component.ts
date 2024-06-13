import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LifeEventsService } from '../services/life-events.service';
import { MayaUserExperienceService } from '../services/maya-user-experience.service';
import { LifeEvent } from '../utils/life-event-utils';
import { map, startWith, switchMap } from 'rxjs/operators';
import { createLifeEventsRoute } from '../utils/route_mapper';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { PolynomialAllocation, Stocks } from '../utils/maya-ecs-components';
import { quadratic } from '../third_party/models/quadratic';


enum MultiplierType {
  HISTORICAL,
  RANDOM_WALK,
  CUSTOM,
}

@Component({
  selector: 'app-add-stocks-life-event',
  templateUrl: './add-stocks-life-event.component.html',
  styleUrl: './add-stocks-life-event.component.scss'
})
export class AddStocksLifeEventComponent {
  gridOptions: c3.GridOptions = {
    y: {
      lines: [
        { value: 0 },
      ]
    }
  };

  controls = {
    value: new FormControl<number>(0),
    startPeriod: new FormControl<number>(0),
    
    multiplierType: new FormControl<MultiplierType>(MultiplierType.CUSTOM),
    customMultiplierInput: new FormControl<string>(""),
    annualMultiplier: new FormControl<number[]>([1]),
    periods: new FormControl<number>(60),
  }

  form = new FormGroup(this.controls);

  historicalReturns = [];
  randomWalk = [.8, 1.25, .666, 1.5];

  annualMultiplier = combineLatest([
    this.controls.multiplierType.valueChanges,
    this.controls.annualMultiplier.valueChanges,
  ]).pipe(
    map(([
      multiplerType,
      // annualMultiplier
    ]) => {
      const customMultiplierInput = this.controls.customMultiplierInput.value
        .split(',')
        .map(Number);

      return multiplerType === MultiplierType.HISTORICAL ? this.historicalReturns :
        multiplerType === MultiplierType.RANDOM_WALK ? this.randomWalk :
        multiplerType === MultiplierType.CUSTOM ? customMultiplierInput : 
        [1];
    })
  );

  // This monte carlo's some, maybe we show a distribution of returns in a bell-ish curve? 
  // this can better show percentiles, bernoulli paradox
  polynomialChart = combineLatest([
    this.controls.startPeriod.valueChanges.pipe(startWith(0)),
    this.controls.periods.valueChanges.pipe(startWith(0)),
    this.annualMultiplier,
  ]).pipe(
    map(([
    startPeriod,
    periods,
    annualMultiplier,
  ]) => {
    // generate a visual of this curve for all periods
    const seriesLength = this.controls.startPeriod.value+this.controls.periods.value;
    const series = new Array(seriesLength)
      .fill(0)
      .map((v,x) => {
        return 0;
      });

    const chartData: c3.Data = {
      columns: [
        ['returns', ...series],
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

        const component:Stocks = Array.from(components.values())
          .find(suspect => suspect.key === lifeEvent.componentKey) as Stocks ?? lifeEvent.createComponent() as Stocks;
        
        this.controls.startPeriod.setValue(component.startPeriod);
        

        lifeEvent.createFriendlyFieldDescription = () => '';
        return this.createViewModel(lifeEvent, component);
      }));
    })
  );

  private createViewModel(lifeEvent:LifeEvent, component: Stocks) {
    const saveLoan = () => {
      
      component.startPeriod = this.controls.startPeriod.value;
      
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
