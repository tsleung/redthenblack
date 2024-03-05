import { TestBed } from '@angular/core/testing';

import { PrompterService } from './prompter.service';

describe('PrompterService', () => {
  let service: PrompterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrompterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
