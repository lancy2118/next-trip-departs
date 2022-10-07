import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Direction,
  NextTripDetails,
  Routes,
  Stop,
} from 'src/app/data-access/next-trip/types';
import { NextTripService } from 'src/app/data-access/next-trip/next-trip.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/data-access/shared-data-service/shared-data.service';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.scss'],
})
export class SelectOptionsComponent implements OnInit {
  title = 'metro-transit-next-trip';
  public selectedRouteId: string;
  public selectedDirectionId: number;
  public selectedStopId: string;
  public showDirectionOptions = false;
  public showStopOptions = false;
  public showMyTrip = false;
  public availableRoutes: Routes[];
  public availableDirections: Direction[];
  public availableStops: Stop[];
  public nextTripDetails: NextTripDetails;
  public more = false;

  routeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _nextTripService: NextTripService,
    private _router: Router,
    private _sharedDataService: SharedDataService
  ) {}
  // create a form with select options
  createRouteForm() {
    this.routeForm = this.fb.group({
      route: ['', Validators.required],
      direction: ['', Validators.required],
      stop: ['', Validators.required],
    });
  }
  // when a route is selected, get selected route and fetch directions along the route
  public routeSelectedEvent(event) {
    this.selectedRouteId = (event.target as HTMLInputElement).value;
    this._nextTripService
      .getDirections(this.selectedRouteId)
      .subscribe((res) => {
        if (res?.length > 0) {
          this.availableDirections = res;
          this.showDirectionOptions = true;
          this.showStopOptions = false;
          this.routeForm.patchValue({
            ...this.routeForm,
            direction: '',
          });
          this._sharedDataService.sendData(false);
        }
      });
  }
  // when a direction is selected, get selected route, direction and fetch stop along the direction
  public directionSelectedEvent(event) {
    this.selectedDirectionId = parseInt(
      (event.target as HTMLInputElement).value
    );
    this._nextTripService
      .getStops(this.selectedRouteId, this.selectedDirectionId)
      .subscribe((res) => {
        if (res?.length > 0) {
          this.availableStops = res;
          this._sharedDataService.sendData(false);
          this.showStopOptions = true;
          this.routeForm.patchValue({
            ...this.routeForm,
            stop: '',
          });
        }
      });
  }

  // when a stop is selected, get selected route, direction, stop and fetch available departures
  public stopSelectedEvent(event) {
    this.selectedStopId = (event.target as HTMLInputElement).value;
    this._sharedDataService.sendData(true);
    this._router.navigate([
      '/nextTrip',
      this.selectedRouteId,
      this.selectedDirectionId,
      this.selectedStopId,
    ]);
  }

  // get all available routes when component loads
  public getRoutes(): void {
    this._nextTripService.getRoutes().subscribe((res) => {
      if (res?.length > 0) {
        this.availableRoutes = res;
      }
    });
  }

  ngOnInit(): void {
    this.createRouteForm();
    this.getRoutes();
  }
}
