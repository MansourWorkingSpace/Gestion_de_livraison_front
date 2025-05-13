import { TestBed } from '@angular/core/testing';

import { CommercantsService } from './commercants.service';

describe('CommercantsService', () => {
  let service: CommercantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommercantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
