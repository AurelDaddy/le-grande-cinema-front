import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Salle } from './salle';

@Injectable({
  providedIn: 'root'
})
export class AdminSalleService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:8080/api/admin/salles';

  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.apiUrl);
  }
}