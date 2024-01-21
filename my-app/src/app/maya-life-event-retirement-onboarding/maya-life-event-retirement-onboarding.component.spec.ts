import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventRetirementOnboardingComponent } from './maya-life-event-retirement-onboarding.component';

describe('MayaLifeEventRetirementOnboardingComponent', () => {
  let component: MayaLifeEventRetirementOnboardingComponent;
  let fixture: ComponentFixture<MayaLifeEventRetirementOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventRetirementOnboardingComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventRetirementOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
