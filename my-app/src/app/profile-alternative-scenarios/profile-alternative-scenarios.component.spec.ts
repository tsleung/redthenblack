import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAlternativeScenariosComponent } from './profile-alternative-scenarios.component';

describe('ProfileAlternativeScenariosComponent', () => {
  let component: ProfileAlternativeScenariosComponent;
  let fixture: ComponentFixture<ProfileAlternativeScenariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAlternativeScenariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileAlternativeScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
