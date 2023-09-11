import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontloadDcaRetirementComponent } from './frontload-dca-retirement.component';

describe('FrontloadDcaRetirementComponent', () => {
  let component: FrontloadDcaRetirementComponent;
  let fixture: ComponentFixture<FrontloadDcaRetirementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrontloadDcaRetirementComponent]
    });
    fixture = TestBed.createComponent(FrontloadDcaRetirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
