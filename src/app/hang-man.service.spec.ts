import { TestBed } from '@angular/core/testing';

import { HangManService } from './hang-man.service';

describe('HangManService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HangManService = TestBed.get(HangManService);
    expect(service).toBeTruthy();
  });
});
