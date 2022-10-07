import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SelectOptionsComponent } from './select-options.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NextTripService } from 'src/app/data-access/next-trip/next-trip.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/data-access/shared-data-service/shared-data.service';

describe('SelectOptionsComponent', () => {
  let component: SelectOptionsComponent;
  let fixture: ComponentFixture<SelectOptionsComponent>;
  let nextTripService: NextTripService;
  let router: Router;
  let sharedDataService: SharedDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [SelectOptionsComponent],
      providers: [
        {
          provide: NextTripService,
          useValue: {
            getRoutes: () =>
              of([
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
              ]),
            getDirections: () =>
              of([
                {
                  direction_id: 1,
                  direction_name: 'direction 1',
                },
                {
                  direction_id: 2,
                  direction_name: 'direction 2',
                },
              ]),
            getStops: () =>
              of([
                {
                  description: 'stop 1',
                  place_code: 'stop1',
                },
                {
                  description: 'stop 2',
                  place_code: 'stop2',
                },
              ]),
          },
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOptionsComponent);
    component = fixture.componentInstance;
    nextTripService = TestBed.get(NextTripService);
    router = TestBed.get(Router);
    sharedDataService = TestBed.get(SharedDataService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'metro-transit-next-trip'`, () => {
    spyOn(component, 'createRouteForm').and.callThrough();
    spyOn(component, 'getRoutes').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.createRouteForm).toHaveBeenCalled();
    expect(component.getRoutes).toHaveBeenCalled();
  });

  it(`select by route should call route selected event and update selectedRouteId and call getDirections'`, () => {
    spyOn(component, 'routeSelectedEvent').and.callThrough();
    spyOn(nextTripService, 'getDirections').and.callThrough();
    spyOn(sharedDataService, 'sendData').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const select: HTMLSelectElement = fixture.debugElement.query(
      By.css('#route')
    ).nativeElement;
    select.value = select.options[1].value; // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.routeSelectedEvent).toHaveBeenCalled();
    expect(component.selectedRouteId).toBe(select.options[1].value);
    expect(nextTripService.getDirections).toHaveBeenCalledWith(select.value);
    expect(sharedDataService.sendData).toHaveBeenCalledWith(false);
  });

  it(`select by direction should call direction selected event and update selectedDirectionId and call getStops'`, () => {
    spyOn(component, 'directionSelectedEvent').and.callThrough();
    spyOn(nextTripService, 'getStops').and.callThrough();
    spyOn(sharedDataService, 'sendData').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const selectRoute: HTMLSelectElement = fixture.debugElement.query(
      By.css('#route')
    ).nativeElement;
    selectRoute.value = selectRoute.options[1].value; // <-- select a new value
    selectRoute.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const select: HTMLSelectElement = fixture.debugElement.query(
      By.css('#direction')
    ).nativeElement;
    select.value = select.options[1].value; // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.directionSelectedEvent).toHaveBeenCalled();
    expect(component.selectedDirectionId).toBe(
      parseInt(select.options[1].value)
    );
    expect(nextTripService.getStops).toHaveBeenCalledWith(
      selectRoute.value,
      parseInt(select.value)
    );
    expect(sharedDataService.sendData).toHaveBeenCalledWith(false);
  });

  it(`select by stop should call stop selected event and update selectedStopId and navigate to trip details page'`, () => {
    spyOn(component, 'stopSelectedEvent').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    spyOn(sharedDataService, 'sendData').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const selectRoute: HTMLSelectElement = fixture.debugElement.query(
      By.css('#route')
    ).nativeElement;
    selectRoute.value = selectRoute.options[1].value; // <-- select a new value
    selectRoute.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const selectDirection: HTMLSelectElement = fixture.debugElement.query(
      By.css('#direction')
    ).nativeElement;
    selectDirection.value = selectDirection.options[1].value; // <-- select a new value
    selectDirection.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const select: HTMLSelectElement = fixture.debugElement.query(
      By.css('#stop')
    ).nativeElement;
    select.value = select.options[1].value; // <-- select a new value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.stopSelectedEvent).toHaveBeenCalled();
    expect(component.selectedStopId).toBe(select.options[1].value);
    expect(sharedDataService.sendData).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith([
      '/nextTrip',
      selectRoute.value,
      parseInt(selectDirection.value),
      select.value,
    ]);
  });
});
