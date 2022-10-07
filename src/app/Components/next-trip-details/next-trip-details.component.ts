import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NextTripService } from 'src/app/data-access/next-trip/next-trip.service';
import { NextTripDetails } from 'src/app/data-access/next-trip/types';
import { SharedDataService } from '../../data-access/shared-data-service/shared-data.service';

@Component({
  selector: 'app-next-trip-details',
  templateUrl: './next-trip-details.component.html',
  styleUrls: ['./next-trip-details.component.scss'],
})
export class NextTripDetailsComponent implements OnInit {
  public selectedRouteId: string;
  public selectedDirectionId: number;
  public selectedStopId: string;
  public nextTripDetails: NextTripDetails;
  public showMyTrip = false;
  public showMoreRoutes = false;

  constructor(
    private _nextTripService: NextTripService,
    private route: ActivatedRoute,
    private _sharedDataService: SharedDataService
  ) {}

  // fetch all details for the specified route, direction and stop and show the details
  public getTripDetails() {
    if (
      this.selectedRouteId &&
      this.selectedDirectionId &&
      this.selectedStopId
    ) {
      this._nextTripService
        .getNextTripDetails(
          this.selectedRouteId,
          this.selectedDirectionId,
          this.selectedStopId
        )
        .subscribe((res) => {
          if (res?.stops) {
            this.nextTripDetails = res;
          }
        });
    }
  }

  // fetch route id, direction id, stop id from quuery params and call getTripDetails
  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.selectedRouteId = routeParams['routeId'];
      this.selectedDirectionId = routeParams['directionId'];
      this.selectedStopId = routeParams['stopId'];
      this.getTripDetails();
    });
    this._sharedDataService.showMyTrip$.subscribe((val) => {
      this.showMyTrip = val;
    });
  }
}
