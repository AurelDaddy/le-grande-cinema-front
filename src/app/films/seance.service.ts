import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seance } from './seance';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getSeancesByFilm(idFilm: number): Observable<Seance[]> {
    return this.http.get<Seance[]>(
      `${this.apiUrl}/films/${idFilm}/seances`
    );
  }
}