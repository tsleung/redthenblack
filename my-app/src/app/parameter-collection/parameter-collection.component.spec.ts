import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterCollectionComponent } from './parameter-collection.component';

describe('ParameterCollectionComponent', () => {
  let component: ParameterCollectionComponent;
  let fixture: ComponentFixture<ParameterCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
