import { TestBed } from '@angular/core/testing';

import { CaratulaUnicaService } from './caratula-unica.service';

describe('CaratulaUnicaService', () => {
  let service: CaratulaUnicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaratulaUnicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
