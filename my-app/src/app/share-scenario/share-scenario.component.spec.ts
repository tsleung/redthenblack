import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareScenarioComponent } from './share-scenario.component';

describe('ShareScenarioComponent', () => {
  let component: ShareScenarioComponent;
  let fixture: ComponentFixture<ShareScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareScenarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
