import { TestBed } from '@angular/core/testing';

import { AdminserService } from './adminser.service';

describe('AdminserService', () => {
  let service: AdminserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
