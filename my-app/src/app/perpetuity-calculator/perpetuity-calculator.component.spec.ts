import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerpetuityCalculatorComponent } from './perpetuity-calculator.component';

describe('PerpetuityCalculatorComponent', () => {
  let component: PerpetuityCalculatorComponent;
  let fixture: ComponentFixture<PerpetuityCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerpetuityCalculatorComponent]
    });
    fixture = TestBed.createComponent(PerpetuityCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
