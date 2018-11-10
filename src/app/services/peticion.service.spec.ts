import { TestBed } from '@angular/core/testing';

import { PeticionService } from './peticion.service';

describe('PeticionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeticionService = TestBed.get(PeticionService);
    expect(service).toBeTruthy();
  });
});
