import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStocksLifeEventComponent } from './add-stocks-life-event.component';

describe('AddStocksLifeEventComponent', () => {
  let component: AddStocksLifeEventComponent;
  let fixture: ComponentFixture<AddStocksLifeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStocksLifeEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStocksLifeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
