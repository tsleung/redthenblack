import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingHoneymoonDownPaymentCalculatorComponent } from './wedding-honeymoon-down-payment-calculator.component';

describe('WeddingHoneymoonDownPaymentCalculatorComponent', () => {
  let component: WeddingHoneymoonDownPaymentCalculatorComponent;
  let fixture: ComponentFixture<WeddingHoneymoonDownPaymentCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeddingHoneymoonDownPaymentCalculatorComponent]
    });
    fixture = TestBed.createComponent(WeddingHoneymoonDownPaymentCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
