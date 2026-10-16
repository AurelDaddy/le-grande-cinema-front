import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateRegisterRequest } from './create-register-request';
import { Utilisateur } from './utilisateur';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly apiUrl = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) {}

    inscription(
        request: CreateRegisterRequest
    ): Observable<Utilisateur> {

        return this.http.post<Utilisateur>(
            `${this.apiUrl}/inscription`, 
            request
        );
    }
}