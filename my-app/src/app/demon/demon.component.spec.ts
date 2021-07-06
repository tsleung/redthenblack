import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonComponent } from './demon.component';

describe('DemonComponent', () => {
  let component: DemonComponent;
  let fixture: ComponentFixture<DemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
