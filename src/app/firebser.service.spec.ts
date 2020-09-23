import { TestBed } from '@angular/core/testing';

import { FirebserService } from './firebser.service';

describe('FirebserService', () => {
  let service: FirebserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
