import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeboxComponent } from './timebox.component';

describe('TimeboxComponent', () => {
  let component: TimeboxComponent;
  let fixture: ComponentFixture<TimeboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
