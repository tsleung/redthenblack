import { TestBed } from '@angular/core/testing';

import { AssetTradingService } from './asset-trading.service';

describe('AssetTradingService', () => {
  let service: AssetTradingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetTradingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
