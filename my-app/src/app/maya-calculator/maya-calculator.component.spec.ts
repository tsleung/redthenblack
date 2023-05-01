import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaCalculatorComponent } from './maya-calculator.component';

describe('MayaCalculatorComponent', () => {
  let component: MayaCalculatorComponent;
  let fixture: ComponentFixture<MayaCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
