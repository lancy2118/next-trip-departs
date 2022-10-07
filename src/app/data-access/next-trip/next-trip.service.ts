import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Direction, NextTripDetails, Routes, Stop } from './types';

@Injectable({
  providedIn: 'root',
})
export class NextTripService {
  baseApiURL = 'https://svc.metrotransit.org/nextripv2';

  private _httpRequestHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private _http: HttpClient) {}
  /**
   * @desc Function to get all available routes
   * @returns list of available routes of type Routes
   */
  public getRoutes(): Observable<Routes[]> {
    return this._http
      .get<Routes[]>(`${this.baseApiURL}/routes`, {
        headers: this._httpRequestHeaders,
      })
      .pipe(
        map((res: Routes[]) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  /**
   * @desc Function to get directions within selected route
   * @param accepts routeId of type string
   * @returns list of available directions for the selected route which is of type Directions
   */
  public getDirections(routeId: string): Observable<Direction[]> {
    return this._http
      .get<Direction[]>(`${this.baseApiURL}/directions/${routeId}`, {
        headers: this._httpRequestHeaders,
      })
      .pipe(
        map((res: Direction[]) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  /**
   * @desc Function to get stops within selected route and direction
   * @param accepts routeId of type string, directionId of type number
   * @returns list of available stops for the selected route and selected direction which is of type Stops
   */
  public getStops(routeId: string, directionId: number): Observable<Stop[]> {
    return this._http
      .get<Stop[]>(`${this.baseApiURL}/stops/${routeId}/${directionId}`, {
        headers: this._httpRequestHeaders,
      })
      .pipe(
        map((res: Stop[]) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }
  /**
   * @desc Function to get departures for the selected route, direction ans top
   * @param accepts routeId of type string, directionId of type number, stopId of type string
   * @returns list of available departures for the selected route,direction and stop which is of type NextTripDetails
   */
  public getNextTripDetails(
    routeId: string,
    directionId: number,
    stopId: string
  ): Observable<NextTripDetails> {
    return this._http
      .get<NextTripDetails>(
        `${this.baseApiURL}/${routeId}/${directionId}/${stopId}`,
        {
          headers: this._httpRequestHeaders,
        }
      )
      .pipe(
        map((res: NextTripDetails) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  // Error handling
  public handleError(error: any) {
    let errorMessage = 'Error in retrieving data';
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
