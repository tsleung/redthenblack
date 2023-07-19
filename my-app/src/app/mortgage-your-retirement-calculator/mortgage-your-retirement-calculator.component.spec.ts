import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageYourRetirementCalculatorComponent } from './mortgage-your-retirement-calculator.component';

describe('MortgageYourRetirementCalculatorComponent', () => {
  let component: MortgageYourRetirementCalculatorComponent;
  let fixture: ComponentFixture<MortgageYourRetirementCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MortgageYourRetirementCalculatorComponent]
    });
    fixture = TestBed.createComponent(MortgageYourRetirementCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
