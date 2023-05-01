import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifestreamViewerComponent } from './lifestream-viewer.component';

describe('LifestreamViewerComponent', () => {
  let component: LifestreamViewerComponent;
  let fixture: ComponentFixture<LifestreamViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifestreamViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifestreamViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
