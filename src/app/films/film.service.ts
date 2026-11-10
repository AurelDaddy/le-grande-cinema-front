import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Film } from './films';
import { API_BASE_URL } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private readonly apiUrl = `${API_BASE_URL}/api/films`

  constructor(private http: HttpClient) {
  }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/${id}`);
}
}