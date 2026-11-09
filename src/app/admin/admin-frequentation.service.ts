import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../core/api.config';

@Injectable({
    providedIn: 'root'
})
export class AdminFrequentationService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = `${API_BASE_URL}/api/admin/frequentation`;

    getTauxDeRemplissage(
        idSeance: number
    ): Observable<number> {

        return this.http.get<number>(
            `${this.apiUrl}/${idSeance}/seance`
        );
    }

    getTauxDeRemplissageParPeriode(
        dateDebut: string,
        dateFin: string
    ): Observable<number> {

        return this.http.get<number>(
            this.apiUrl,
            {
                params: {
                    dateDebut,
                    dateFin
                }
            }
        );
    }
}