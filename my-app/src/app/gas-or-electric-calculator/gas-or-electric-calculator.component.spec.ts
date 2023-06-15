import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasOrElectricCalculatorComponent } from './gas-or-electric-calculator.component';

describe('GasOrElectricCalculatorComponent', () => {
  let component: GasOrElectricCalculatorComponent;
  let fixture: ComponentFixture<GasOrElectricCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasOrElectricCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GasOrElectricCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
