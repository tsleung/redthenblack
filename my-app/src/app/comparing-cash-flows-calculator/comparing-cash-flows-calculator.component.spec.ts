import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparingCashFlowsCalculatorComponent } from './comparing-cash-flows-calculator.component';

describe('ComparingCashFlowsCalculatorComponent', () => {
  let component: ComparingCashFlowsCalculatorComponent;
  let fixture: ComponentFixture<ComparingCashFlowsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparingCashFlowsCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparingCashFlowsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
