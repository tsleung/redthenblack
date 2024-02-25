import { TestBed } from '@angular/core/testing';

import { SharedSheetService } from './shared-sheet.service';

describe('SharedSheetService', () => {
  let service: SharedSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
