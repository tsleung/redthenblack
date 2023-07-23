import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathToMillionaireCalculatorComponent } from './math-to-millionaire-calculator.component';

describe('MathToMillionaireCalculatorComponent', () => {
  let component: MathToMillionaireCalculatorComponent;
  let fixture: ComponentFixture<MathToMillionaireCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MathToMillionaireCalculatorComponent]
    });
    fixture = TestBed.createComponent(MathToMillionaireCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
