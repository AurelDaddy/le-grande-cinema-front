import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Salle } from './salle';
import { API_BASE_URL } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class AdminSalleService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${API_BASE_URL}/api/admin/salles`;

  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(this.apiUrl);
  }
}