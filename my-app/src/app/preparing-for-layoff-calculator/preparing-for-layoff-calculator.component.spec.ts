import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparingForLayoffCalculatorComponent } from './preparing-for-layoff-calculator.component';

describe('PreparingForLayoffCalculatorComponent', () => {
  let component: PreparingForLayoffCalculatorComponent;
  let fixture: ComponentFixture<PreparingForLayoffCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreparingForLayoffCalculatorComponent]
    });
    fixture = TestBed.createComponent(PreparingForLayoffCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
