import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCareCalculatorComponent } from './senior-care-calculator.component';

describe('SeniorCareCalculatorComponent', () => {
  let component: SeniorCareCalculatorComponent;
  let fixture: ComponentFixture<SeniorCareCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeniorCareCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeniorCareCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
