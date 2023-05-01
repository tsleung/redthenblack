import { TestBed } from '@angular/core/testing';

import { MayaUserExperienceService } from './maya-user-experience.service';

describe('MayaUserExperienceService', () => {
  let service: MayaUserExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayaUserExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
