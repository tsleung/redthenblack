import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleBetComponent } from './simple-bet.component';

describe('SimpleBetComponent', () => {
  let component: SimpleBetComponent;
  let fixture: ComponentFixture<SimpleBetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleBetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
