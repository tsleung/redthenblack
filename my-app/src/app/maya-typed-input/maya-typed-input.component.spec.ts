import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaTypedInputComponent } from './maya-typed-input.component';

describe('MayaTypedInputComponent', () => {
  let component: MayaTypedInputComponent;
  let fixture: ComponentFixture<MayaTypedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaTypedInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaTypedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
