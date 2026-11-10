import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Film } from '../films/films';
import { CreateFilmRequest } from './create-film-request';
import { API_BASE_URL } from '../core/api.config';

@Injectable({
  providedIn: 'root'
})
export class AdminFilmService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${API_BASE_URL}/api/admin/films`;

  getAllFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  createFilm(request: CreateFilmRequest): Observable<Film> {
  return this.http.post<Film>(
    this.apiUrl,
    request
  );
}
}
