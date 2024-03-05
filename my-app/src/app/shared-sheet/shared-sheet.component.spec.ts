import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSheetComponent } from './shared-sheet.component';

describe('SharedSheetComponent', () => {
  let component: SharedSheetComponent;
  let fixture: ComponentFixture<SharedSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
