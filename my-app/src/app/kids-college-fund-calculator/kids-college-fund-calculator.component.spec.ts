import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsCollegeFundCalculatorComponent } from './kids-college-fund-calculator.component';

describe('KidsCollegeFundCalculatorComponent', () => {
  let component: KidsCollegeFundCalculatorComponent;
  let fixture: ComponentFixture<KidsCollegeFundCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidsCollegeFundCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsCollegeFundCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
