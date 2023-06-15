import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaTitledContentComponent } from './maya-titled-content.component';

describe('MayaTitledContentComponent', () => {
  let component: MayaTitledContentComponent;
  let fixture: ComponentFixture<MayaTitledContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaTitledContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaTitledContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
