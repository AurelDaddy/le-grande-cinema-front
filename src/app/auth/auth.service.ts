import { Injectable, signal } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { CreateRegisterRequest } from './create-register-request';
import { Utilisateur } from './utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl =
    'http://localhost:8080/api/auth';

  utilisateurConnecte =
    signal<Utilisateur | null>(null);

  private credentials: string | null = null;

  constructor(private http: HttpClient) {

    const credentialsSauvegardes =
      sessionStorage.getItem('credentials');

    const utilisateurSauvegarde =
      sessionStorage.getItem('utilisateur');

    if (
      credentialsSauvegardes &&
      utilisateurSauvegarde
    ) {
      this.credentials =
        credentialsSauvegardes;

      this.utilisateurConnecte.set(
        JSON.parse(utilisateurSauvegarde)
      );
    }
  }

  inscription(
    request: CreateRegisterRequest
  ): Observable<Utilisateur> {

    return this.http.post<Utilisateur>(
      `${this.apiUrl}/inscription`,
      request
    );
  }

  login(
    email: string,
    motDePasse: string
  ): Observable<Utilisateur> {

    const credentials =
      btoa(`${email}:${motDePasse}`);

    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });

    return this.http.get<Utilisateur>(
      `${this.apiUrl}/moi`,
      { headers }
    ).pipe(

      tap((utilisateur) => {

        this.credentials = credentials;

        this.utilisateurConnecte.set(
          utilisateur
        );

        sessionStorage.setItem(
          'credentials',
          credentials
        );

        sessionStorage.setItem(
          'utilisateur',
          JSON.stringify(utilisateur)
        );
      })
    );
  }

  logout(): void {

    this.credentials = null;

    this.utilisateurConnecte.set(null);

    sessionStorage.removeItem(
      'credentials'
    );

    sessionStorage.removeItem(
      'utilisateur'
    );
  }

  getCredentials(): string | null {
    return this.credentials;
  }
}