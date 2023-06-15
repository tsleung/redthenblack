import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostOfLivingCalculatorComponent } from './cost-of-living-calculator.component';

describe('CostOfLivingCalculatorComponent', () => {
  let component: CostOfLivingCalculatorComponent;
  let fixture: ComponentFixture<CostOfLivingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostOfLivingCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostOfLivingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
