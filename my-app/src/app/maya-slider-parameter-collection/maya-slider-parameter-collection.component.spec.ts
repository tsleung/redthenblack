import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaSliderParameterCollectionComponent } from './maya-slider-parameter-collection.component';

describe('MayaSliderParameterCollectionComponent', () => {
  let component: MayaSliderParameterCollectionComponent;
  let fixture: ComponentFixture<MayaSliderParameterCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaSliderParameterCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaSliderParameterCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
