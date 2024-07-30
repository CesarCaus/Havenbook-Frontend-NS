import { TestBed } from '@angular/core/testing';

import { SendEditDataActivityService } from './send-edit-data-activity.service';

describe('SendEditDataActivityService', () => {
  let service: SendEditDataActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEditDataActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
