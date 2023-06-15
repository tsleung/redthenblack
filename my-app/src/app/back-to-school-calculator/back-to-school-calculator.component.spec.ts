import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToSchoolCalculatorComponent } from './back-to-school-calculator.component';

describe('BackToSchoolCalculatorComponent', () => {
  let component: BackToSchoolCalculatorComponent;
  let fixture: ComponentFixture<BackToSchoolCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackToSchoolCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackToSchoolCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
