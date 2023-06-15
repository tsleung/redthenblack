import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementWithdrawalCalculatorComponent } from './retirement-withdrawal-calculator.component';

describe('RetirementWithdrawalCalculatorComponent', () => {
  let component: RetirementWithdrawalCalculatorComponent;
  let fixture: ComponentFixture<RetirementWithdrawalCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirementWithdrawalCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirementWithdrawalCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
