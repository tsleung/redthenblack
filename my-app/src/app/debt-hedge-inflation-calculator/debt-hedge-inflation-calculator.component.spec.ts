import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtHedgeInflationCalculatorComponent } from './debt-hedge-inflation-calculator.component';

describe('DebtHedgeInflationCalculatorComponent', () => {
  let component: DebtHedgeInflationCalculatorComponent;
  let fixture: ComponentFixture<DebtHedgeInflationCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebtHedgeInflationCalculatorComponent]
    });
    fixture = TestBed.createComponent(DebtHedgeInflationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
