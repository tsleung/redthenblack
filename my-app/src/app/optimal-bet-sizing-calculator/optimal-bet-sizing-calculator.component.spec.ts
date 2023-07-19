import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimalBetSizingCalculatorComponent } from './optimal-bet-sizing-calculator.component';

describe('OptimalBetSizingCalculatorComponent', () => {
  let component: OptimalBetSizingCalculatorComponent;
  let fixture: ComponentFixture<OptimalBetSizingCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptimalBetSizingCalculatorComponent]
    });
    fixture = TestBed.createComponent(OptimalBetSizingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
