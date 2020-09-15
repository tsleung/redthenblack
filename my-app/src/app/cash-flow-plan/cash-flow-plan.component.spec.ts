import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowPlanComponent } from './cash-flow-plan.component';

describe('CashFlowPlanComponent', () => {
  let component: CashFlowPlanComponent;
  let fixture: ComponentFixture<CashFlowPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashFlowPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
