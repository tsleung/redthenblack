import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLayoutTwoRowComponent } from './maya-layout-two-row.component';

describe('MayaLayoutTwoRowComponent', () => {
  let component: MayaLayoutTwoRowComponent;
  let fixture: ComponentFixture<MayaLayoutTwoRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaLayoutTwoRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaLayoutTwoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
