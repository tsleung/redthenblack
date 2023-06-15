import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayingDebtCalculatorComponent } from './paying-debt-calculator.component';

describe('PayingDebtCalculatorComponent', () => {
  let component: PayingDebtCalculatorComponent;
  let fixture: ComponentFixture<PayingDebtCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayingDebtCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayingDebtCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
