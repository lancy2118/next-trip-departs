import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private _showMyTrip$ = new ReplaySubject<boolean>(1);
  public showMyTrip$ = this._showMyTrip$.asObservable();

  //function which keeps tracks of input changes which is used to hide/display the next departure section
  sendData(data: boolean) {
    this._showMyTrip$.next(data);
  }
}
