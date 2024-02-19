import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolynomialAllocationLifeEventComponent } from './add-polynomial-allocation-life-event.component';

describe('AddPolynomialAllocationLifeEventComponent', () => {
  let component: AddPolynomialAllocationLifeEventComponent;
  let fixture: ComponentFixture<AddPolynomialAllocationLifeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPolynomialAllocationLifeEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPolynomialAllocationLifeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
