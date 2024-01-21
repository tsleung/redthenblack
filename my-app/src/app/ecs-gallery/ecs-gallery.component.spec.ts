import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcsGalleryComponent } from './ecs-gallery.component';

describe('EcsGalleryComponent', () => {
  let component: EcsGalleryComponent;
  let fixture: ComponentFixture<EcsGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcsGalleryComponent]
    });
    fixture = TestBed.createComponent(EcsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
