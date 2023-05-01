import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaOnboardComponent } from './maya-onboard.component';

describe('MayaOnboardComponent', () => {
  let component: MayaOnboardComponent;
  let fixture: ComponentFixture<MayaOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaOnboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
