import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventInvestmentsOnboardingComponent } from './maya-life-event-investments-onboarding.component';

describe('MayaLifeEventInvestmentsOnboardingComponent', () => {
  let component: MayaLifeEventInvestmentsOnboardingComponent;
  let fixture: ComponentFixture<MayaLifeEventInvestmentsOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventInvestmentsOnboardingComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventInvestmentsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
