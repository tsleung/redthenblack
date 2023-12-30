import { TestBed } from '@angular/core/testing';

import { LifeEventsService } from './life-events.service';

describe('LifeEventsService', () => {
  let service: LifeEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifeEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
