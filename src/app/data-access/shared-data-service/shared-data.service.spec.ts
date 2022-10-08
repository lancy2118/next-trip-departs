import { TestBed } from '@angular/core/testing';

import { SharedDataService } from './shared-data.service';

describe('SharedDataService', () => {
  let service: SharedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit value when send Data is called', () => {
    service.sendData(false);
    service.showMyTrip$.subscribe((res) => {
      expect(res).toBe(false);
    });
  });

  it('should emit value when sendSelectedRouteDetails is called', () => {
    service.sendSelectedRouteDetails('123', 12, '123');
    service.showSelectedRouteId$.subscribe((res) => {
      expect(res).toBe('123');
    });
    service.showSelectedDirectionId$.subscribe((res) => {
      expect(res).toBe(12);
    });
    service.showSelectedStopId$.subscribe((res) => {
      expect(res).toBe('123');
    });
  });
});
