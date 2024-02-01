import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaCalloutContentComponent } from './maya-callout-content.component';

describe('MayaCalloutContentComponent', () => {
  let component: MayaCalloutContentComponent;
  let fixture: ComponentFixture<MayaCalloutContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayaCalloutContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MayaCalloutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
