import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../model/Trip';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  _url = 'http://localhost:5555/api/v1/trips';
  constructor(private _http: HttpClient) {}
  _refreshTrip = new Subject<void>();

  get refreshTrip() {
    return this._refreshTrip;
  }

  createTrip(values) {
    const submitValues = {
      ...values,
      destination: [{ ...values.destination }, ...values.destinations],
    };
    console.log(submitValues);
    return this._http.post<any>(this._url, submitValues).pipe(
      tap(() => {
        this._refreshTrip.next();
      })
    );
  }

  updateTrip(values) {
    const submitValues = {
      ...values,
      destination: [{ ...values.destination }, ...values.destinations],
    };
    console.log(submitValues);
    return this._http
      .put<any>(`${this._url}/${submitValues._id}`, submitValues)
      .pipe(
        tap(() => {
          this._refreshTrip.next();
        })
      );
  }

  getTrips(): Observable<Trip> {
    return this._http.get<any>(this._url).pipe(map((res) => res.data));
  }

  deleteTrip(index: string) {
    console.log(index);
    return this._http.delete(`${this._url}/${index}`).pipe(
      tap(() => {
        this._refreshTrip.next();
      })
    );
  }
}
