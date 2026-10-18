import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Billet } from './billet.model';

@Injectable({
  providedIn: 'root'
})
export class BilletService {

  private readonly apiUrl =
    'http://localhost:8080/api/billets';

  constructor(private http: HttpClient) {}

  getBilletsUtilisateur(): Observable<Billet[]> {
    return this.http.get<Billet[]>(this.apiUrl);
  }

  getBilletByReservation(
    idReservation: number
  ): Observable<Billet> {

    return this.http.get<Billet>(
      `${this.apiUrl}/${idReservation}`
    );
  }
}