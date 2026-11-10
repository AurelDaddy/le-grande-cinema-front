import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Seance } from './seance';
import { API_BASE_URL } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private readonly apiUrl = `${API_BASE_URL}/api`;

  constructor(private http: HttpClient) {}

  getSeancesByFilm(idFilm: number): Observable<Seance[]> {
    return this.http.get<Seance[]>(
      `${this.apiUrl}/films/${idFilm}/seances`
    );
  }

  getNombrePlacesDisponibles(
  idSeance: number
): Observable<number> {

  return this.http.get<number>(
    `${this.apiUrl}/seances/${idSeance}/places-disponibles`
  );
}

}