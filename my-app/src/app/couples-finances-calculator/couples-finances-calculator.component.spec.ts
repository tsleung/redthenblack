import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouplesFinancesCalculatorComponent } from './couples-finances-calculator.component';

describe('CouplesFinancesCalculatorComponent', () => {
  let component: CouplesFinancesCalculatorComponent;
  let fixture: ComponentFixture<CouplesFinancesCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouplesFinancesCalculatorComponent]
    });
    fixture = TestBed.createComponent(CouplesFinancesCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
