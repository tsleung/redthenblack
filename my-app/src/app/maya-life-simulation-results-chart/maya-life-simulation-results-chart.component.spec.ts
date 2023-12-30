import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeSimulationResultsChartComponent } from './maya-life-simulation-results-chart.component';

describe('MayaLifeSimulationResultsChartComponent', () => {
  let component: MayaLifeSimulationResultsChartComponent;
  let fixture: ComponentFixture<MayaLifeSimulationResultsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeSimulationResultsChartComponent]
    });
    fixture = TestBed.createComponent(MayaLifeSimulationResultsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
