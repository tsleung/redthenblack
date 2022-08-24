import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleLineChartComponent } from './multiple-line-chart.component';

describe('MultipleLineChartComponent', () => {
  let component: MultipleLineChartComponent;
  let fixture: ComponentFixture<MultipleLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
