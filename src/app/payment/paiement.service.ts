import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Paiement } from './paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private readonly apiUrl =
    'http://localhost:8080/api/paiements';

  constructor(private http: HttpClient) {}

  effectuerPaiement(
    idReservation: number
  ): Observable<Paiement> {

    return this.http.post<Paiement>(
      this.apiUrl,
      {
        idReservation
      }
    );
  }
}