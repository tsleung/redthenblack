import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaCardSelectionComponent } from './maya-card-selection.component';

describe('MayaCardSelectionComponent', () => {
  let component: MayaCardSelectionComponent;
  let fixture: ComponentFixture<MayaCardSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaCardSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaCardSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
