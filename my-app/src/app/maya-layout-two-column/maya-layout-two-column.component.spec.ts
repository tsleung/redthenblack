import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaLayoutTwoColumnComponent } from './maya-layout-two-column.component';

describe('MayaLayoutTwoColumnComponent', () => {
  let component: MayaLayoutTwoColumnComponent;
  let fixture: ComponentFixture<MayaLayoutTwoColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaLayoutTwoColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaLayoutTwoColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
