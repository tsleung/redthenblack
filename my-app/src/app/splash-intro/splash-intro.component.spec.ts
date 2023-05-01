import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashIntroComponent } from './splash-intro.component';

describe('SplashIntroComponent', () => {
  let component: SplashIntroComponent;
  let fixture: ComponentFixture<SplashIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
