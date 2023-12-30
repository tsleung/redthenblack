import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventsAddComponent } from './maya-life-events-add.component';

describe('MayaLifeEventsAddComponent', () => {
  let component: MayaLifeEventsAddComponent;
  let fixture: ComponentFixture<MayaLifeEventsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventsAddComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
