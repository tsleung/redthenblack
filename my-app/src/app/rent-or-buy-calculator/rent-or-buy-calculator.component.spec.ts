import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentOrBuyCalculatorComponent } from './rent-or-buy-calculator.component';

describe('RentOrBuyCalculatorComponent', () => {
  let component: RentOrBuyCalculatorComponent;
  let fixture: ComponentFixture<RentOrBuyCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentOrBuyCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentOrBuyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
