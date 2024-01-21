import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventSavingsOnboardingComponent } from './maya-life-event-savings-onboarding.component';

describe('MayaLifeEventSavingsOnboardingComponent', () => {
  let component: MayaLifeEventSavingsOnboardingComponent;
  let fixture: ComponentFixture<MayaLifeEventSavingsOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventSavingsOnboardingComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventSavingsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
