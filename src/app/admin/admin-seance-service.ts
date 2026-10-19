import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Seance } from '../films/seance';

@Injectable({
  providedIn: 'root'
})
export class AdminSeanceService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/admin/seances';

  getAllSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.apiUrl);
  }

  deleteSeance(idSeance: number): Observable<void> {
    return this.http.delete<void>(
        `${this.apiUrl}/${idSeance}`
  );
}
}