import { TestBed } from '@angular/core/testing';

import { CarrerasService } from './carreras.service';

describe('CarrerasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarrerasService = TestBed.get(CarrerasService);
    expect(service).toBeTruthy();
  });
});
