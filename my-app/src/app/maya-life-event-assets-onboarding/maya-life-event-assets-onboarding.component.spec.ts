import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventAssetsOnboardingComponent } from './maya-life-event-assets-onboarding.component';

describe('MayaLifeEventAssetsOnboardingComponent', () => {
  let component: MayaLifeEventAssetsOnboardingComponent;
  let fixture: ComponentFixture<MayaLifeEventAssetsOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventAssetsOnboardingComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventAssetsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
