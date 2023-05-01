import { TestBed } from '@angular/core/testing';

import { LifestreamService } from './lifestream.service';

describe('LifestreamService', () => {
  let service: LifestreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifestreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
