import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventBuildingOnboardingComponent } from './maya-life-event-building-onboarding.component';

describe('MayaLifeEventBuildingOnboardingComponent', () => {
  let component: MayaLifeEventBuildingOnboardingComponent;
  let fixture: ComponentFixture<MayaLifeEventBuildingOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventBuildingOnboardingComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventBuildingOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
