import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventsListComponent } from './maya-life-events-list.component';

describe('MayaLifeEventsListComponent', () => {
  let component: MayaLifeEventsListComponent;
  let fixture: ComponentFixture<MayaLifeEventsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventsListComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
