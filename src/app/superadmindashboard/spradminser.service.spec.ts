import { TestBed } from '@angular/core/testing';

import { SpradminserService } from './spradminser.service';

describe('SpradminserService', () => {
  let service: SpradminserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpradminserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
