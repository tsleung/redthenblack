import { TestBed } from '@angular/core/testing';

import { FindMyRetirementService } from './find-my-retirement.service';

describe('FindMyRetirementService', () => {
  let service: FindMyRetirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindMyRetirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
