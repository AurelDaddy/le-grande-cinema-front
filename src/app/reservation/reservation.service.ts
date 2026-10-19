import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reservation } from './reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly apiUrl =
    'http://localhost:8080/api/reservations';

  constructor(private http: HttpClient) {}

  creerReservation(
    idSeance: number,
    nombrePlaces: number
  ): Observable<Reservation> {

    return this.http.post<Reservation>(
      this.apiUrl,
      {
        idSeance,
        nombrePlaces
      }
    );
  }
}