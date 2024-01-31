import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanLifeEventComponent } from './add-loan-life-event.component';

describe('AddLoanLifeEventComponent', () => {
  let component: AddLoanLifeEventComponent;
  let fixture: ComponentFixture<AddLoanLifeEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanLifeEventComponent]
    });
    fixture = TestBed.createComponent(AddLoanLifeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
