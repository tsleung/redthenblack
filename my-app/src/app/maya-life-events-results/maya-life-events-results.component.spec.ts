import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventsResultsComponent } from './maya-life-events-results.component';

describe('MayaLifeEventsResultsComponent', () => {
  let component: MayaLifeEventsResultsComponent;
  let fixture: ComponentFixture<MayaLifeEventsResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventsResultsComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
