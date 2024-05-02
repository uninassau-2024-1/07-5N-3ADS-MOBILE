import { TestBed } from '@angular/core/testing';

import { senhasService } from './senhas-service.service';

describe('SenhasServiceService', () => {
  let service: senhasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(senhasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
