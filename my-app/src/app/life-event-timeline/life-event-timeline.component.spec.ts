import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeEventTimelineComponent } from './life-event-timeline.component';

describe('LifeEventTimelineComponent', () => {
  let component: LifeEventTimelineComponent;
  let fixture: ComponentFixture<LifeEventTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeEventTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LifeEventTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
