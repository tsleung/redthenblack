import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaParameterCollectionComponent } from './maya-parameter-collection.component';

describe('MayaParameterCollectionComponent', () => {
  let component: MayaParameterCollectionComponent;
  let fixture: ComponentFixture<MayaParameterCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaParameterCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaParameterCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
