import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeseriesChartComponent } from './timeseries-chart.component';

describe('TimeseriesChartComponent', () => {
  let component: TimeseriesChartComponent;
  let fixture: ComponentFixture<TimeseriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeseriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeseriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
