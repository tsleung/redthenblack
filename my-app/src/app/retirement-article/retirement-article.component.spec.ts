import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementArticleComponent } from './retirement-article.component';

describe('RetirementArticleComponent', () => {
  let component: RetirementArticleComponent;
  let fixture: ComponentFixture<RetirementArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirementArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirementArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
