import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventsComponent } from './maya-life-events.component';

describe('MayaLifeEventsComponent', () => {
  let component: MayaLifeEventsComponent;
  let fixture: ComponentFixture<MayaLifeEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventsComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
