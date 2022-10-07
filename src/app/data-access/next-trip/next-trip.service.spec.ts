import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NextTripService } from './next-trip.service';

const mockRoutes = [
  {
    route_id: '1',
    agency_id: 1,
    route_label: 'route 1',
  },
  {
    route_id: '2',
    agency_id: 2,
    route_label: 'route 2',
  },
];

const mockDirections = [
  {
    direction_id: 1,
    direction_name: 'direction 1',
  },
  {
    direction_id: 2,
    direction_name: 'direction 2',
  },
];
const mockStops = [
  {
    description: 'stop 1',
    place_code: 'stop1',
  },
  {
    description: 'stop 2',
    place_code: 'stop2',
  },
];

const mockTripDetails = {
  stops: [
    {
      stop_id: 48084,
      latitude: 44.88321,
      longitude: -93.295321,
      description: 'I-35W & 66th Street Station',
    },
  ],
  alerts: [],
  departures: [
    {
      actual: true,
      trip_id: '22600674-AUG22-MVS-BUS-Weekday-01',
      stop_id: 48084,
      departure_text: '11 Min',
      departure_time: 1665160936,
      description: 'Minneapolis / Rapid',
      route_id: '904',
      route_short_name: 'Orange',
      direction_id: 0,
      direction_text: 'NB',
      schedule_relationship: 'Scheduled',
      terminal: 'abc',
      gate: '1',
    },
    {
      actual: false,
      trip_id: '22600675-AUG22-MVS-BUS-Weekday-01',
      stop_id: 48084,
      departure_text: '11:58',
      departure_time: 1665161880,
      description: 'Minneapolis / Rapid',
      route_id: '904',
      route_short_name: 'Orange',
      direction_id: 0,
      direction_text: 'NB',
      schedule_relationship: 'Scheduled',
      terminal: 'abc',
      gate: '1',
    },
  ],
};
describe('NextTripService', () => {
  let service: NextTripService;
  let httpController: HttpTestingController;
  let baseApiURL = 'https://svc.metrotransit.org/nextripv2';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NextTripService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getRoutes and return the routes', () => {
    service.getRoutes().subscribe((data) => {
      expect(data).toEqual(mockRoutes);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseApiURL}/routes`,
    });

    req.flush(mockRoutes);
  });

  it('should call getDirections and return the directions', () => {
    const id = '1';
    service.getDirections(id).subscribe((data) => {
      expect(data).toEqual(mockDirections);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseApiURL}/directions/${id}`,
    });

    req.flush(mockDirections);
  });

  it('should call getStops and return the stops', () => {
    const routeId = '1';
    const directionId = 1;
    service.getStops(routeId, directionId).subscribe((data) => {
      expect(data).toEqual(mockStops);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseApiURL}/stops/${routeId}/${directionId}`,
    });

    req.flush(mockStops);
  });

  it('should call getNextTripDetails and return the trip details', () => {
    const routeId = '1';
    const directionId = 1;
    const stopId = '1';
    service
      .getNextTripDetails(routeId, directionId, stopId)
      .subscribe((data) => {
        expect(data).toEqual(mockTripDetails);
      });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${baseApiURL}/${routeId}/${directionId}/${stopId}`,
    });

    req.flush(mockTripDetails);
  });
});
