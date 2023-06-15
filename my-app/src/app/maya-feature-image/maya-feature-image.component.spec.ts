import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaFeatureImageComponent } from './maya-feature-image.component';

describe('MayaFeatureImageComponent', () => {
  let component: MayaFeatureImageComponent;
  let fixture: ComponentFixture<MayaFeatureImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaFeatureImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaFeatureImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
