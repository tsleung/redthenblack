import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLifeEventCardComponent } from './maya-life-event-card.component';

describe('MayaLifeEventCardComponent', () => {
  let component: MayaLifeEventCardComponent;
  let fixture: ComponentFixture<MayaLifeEventCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayaLifeEventCardComponent]
    });
    fixture = TestBed.createComponent(MayaLifeEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
