import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexingCalculatorComponent } from './indexing-calculator.component';

describe('IndexingCalculatorComponent', () => {
  let component: IndexingCalculatorComponent;
  let fixture: ComponentFixture<IndexingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexingCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
