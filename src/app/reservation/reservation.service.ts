import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reservation } from './reservation.model';
import { API_BASE_URL } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly apiUrl = `${API_BASE_URL}/api/reservations`;

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