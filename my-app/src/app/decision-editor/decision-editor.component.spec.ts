import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionEditorComponent } from './decision-editor.component';

describe('DecisionEditorComponent', () => {
  let component: DecisionEditorComponent;
  let fixture: ComponentFixture<DecisionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
