import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginnerTalkComponent } from './beginner-talk.component';

describe('BeginnerTalkComponent', () => {
  let component: BeginnerTalkComponent;
  let fixture: ComponentFixture<BeginnerTalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginnerTalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginnerTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
