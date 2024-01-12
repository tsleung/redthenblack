import { TestBed } from '@angular/core/testing';

import { ImageAssetService } from './image-asset.service';

describe('ImageAssetService', () => {
  let service: ImageAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
