import { TestBed } from '@angular/core/testing';

import { CloseBoxService } from './close-box.service';

describe('CloseBoxService', () => {
  let service: CloseBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
