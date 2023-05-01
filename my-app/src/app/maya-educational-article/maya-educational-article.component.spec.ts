import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayaEducationalArticleComponent } from './maya-educational-article.component';

describe('MayaEducationalArticleComponent', () => {
  let component: MayaEducationalArticleComponent;
  let fixture: ComponentFixture<MayaEducationalArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayaEducationalArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayaEducationalArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
