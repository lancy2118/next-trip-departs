import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private _showMyTrip$ = new ReplaySubject<boolean>(1);
  public showMyTrip$ = this._showMyTrip$.asObservable();
  private _showSelectedRouteId$ = new ReplaySubject<string>(1);
  public showSelectedRouteId$ = this._showSelectedRouteId$.asObservable();
  private _showSelectedDirectionId$ = new ReplaySubject<number>(1);
  public showSelectedDirectionId$ =
    this._showSelectedDirectionId$.asObservable();
  private _showSelectedStopId$ = new ReplaySubject<string>(1);
  public showSelectedStopId$ = this._showSelectedStopId$.asObservable();

  //function which keeps tracks of input changes which is used to hide/display the next departure section
  sendData(data: boolean) {
    this._showMyTrip$.next(data);
  }

  //function to send selected route, direction, stop when navigating back and forward
  sendSelectedRouteDetails(
    routeId: string,
    directionId: number,
    stopId: string
  ) {
    this._showSelectedRouteId$.next(routeId);
    this._showSelectedDirectionId$.next(directionId);
    this._showSelectedStopId$.next(stopId);
  }
}
