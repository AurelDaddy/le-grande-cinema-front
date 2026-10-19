import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminFrequentationService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/admin/frequentation';

  getTauxDeRemplissage(
    idSeance: number
  ): Observable<number> {

    return this.http.get<number>(
      `${this.apiUrl}/${idSeance}/seance`
    );
  }
}