import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Paiement } from './paiement.model';
import { API_BASE_URL } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private readonly apiUrl = `${API_BASE_URL}/api/paiements`;

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