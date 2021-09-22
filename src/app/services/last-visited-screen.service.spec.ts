import { TestBed } from '@angular/core/testing';

import { LastVisitedScreenService } from './last-visited-screen.service';

describe('LastVisitedScreenService', () => {
  let service: LastVisitedScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastVisitedScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
