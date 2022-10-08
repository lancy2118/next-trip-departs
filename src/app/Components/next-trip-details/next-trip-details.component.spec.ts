import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NextTripService } from 'src/app/data-access/next-trip/next-trip.service';
import { SharedDataService } from 'src/app/data-access/shared-data-service/shared-data.service';

import { NextTripDetailsComponent } from './next-trip-details.component';

const nextTripDetails = {
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

describe('NextTripDetailsComponent', () => {
  let component: NextTripDetailsComponent;
  let fixture: ComponentFixture<NextTripDetailsComponent>;
  let nextTripService: NextTripService;
  let sharedDataService: SharedDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextTripDetailsComponent],
      providers: [
        {
          provide: SharedDataService,
          useValue: {
            showMyTrip$: of(true),
            sendData: () => {},
            sendSelectedRouteDetails: () => {},
          },
        },
        {
          provide: NextTripService,
          useValue: {
            getNextTripDetails: () => of(nextTripDetails),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ routeId: '123', directionId: 12, stopId: '123' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NextTripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTripDetailsComponent);
    component = fixture.componentInstance;
    nextTripService = TestBed.get(NextTripService);
    sharedDataService = TestBed.get(SharedDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get values from query params and assign accordingly and call getTripDetails and store selected values', () => {
    spyOn(component, 'getTripDetails').and.callThrough();
    spyOn(sharedDataService, 'sendSelectedRouteDetails').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.selectedRouteId).toBe('123');
    expect(component.selectedDirectionId).toBe(12);
    expect(component.selectedStopId).toBe('123');
    expect(component.getTripDetails).toHaveBeenCalled();
    expect(sharedDataService.sendSelectedRouteDetails).toHaveBeenCalledWith(
      '123',
      12,
      '123'
    );
  });

  it('should call getNextTripDetails and assign value and show trip details ', () => {
    spyOn(nextTripService, 'getNextTripDetails').and.callThrough();
    spyOn(sharedDataService, 'sendData').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(nextTripService.getNextTripDetails).toHaveBeenCalledWith(
      '123',
      12,
      '123'
    );
    expect(component.showMyTrip).toBe(true);
    expect(component.nextTripDetails).toBe(nextTripDetails);
    expect(sharedDataService.sendData).toHaveBeenCalled();
  });
});
