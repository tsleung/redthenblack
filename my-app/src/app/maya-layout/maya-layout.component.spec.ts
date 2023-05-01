import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLayoutComponent } from './maya-layout.component';

describe('MayaLayoutComponent', () => {
  let component: MayaLayoutComponent;
  let fixture: ComponentFixture<MayaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
