import { TestBed, inject } from '@angular/core/testing';

import { TrajetTypeService } from './trajet-type.service';

describe('TrajetTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrajetTypeService]
    });
  });

  it('should be created', inject([TrajetTypeService], (service: TrajetTypeService) => {
    expect(service).toBeTruthy();
  }));
});
