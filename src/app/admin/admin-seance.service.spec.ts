import { TestBed } from '@angular/core/testing';
import {
    provideHttpClient
} from '@angular/common/http';

import {
    HttpTestingController,
    provideHttpClientTesting
} from '@angular/common/http/testing';

import { AdminSeanceService } from './admin-seance.service';

describe('AdminSeanceService', () => {

    let service: AdminSeanceService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                AdminSeanceService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service =
            TestBed.inject(AdminSeanceService);

        httpTestingController =
            TestBed.inject(HttpTestingController);
    });

    //vérification qu'il n'y a pas de requêtes HTTP en attente après chaque test
    afterEach(() => {
        httpTestingController.verify();
    });

    it('should récupérer toutes les séances', () => {

        const seancesMock = [
            {
                idSeance: 1,
                dateHeure: '2026-10-25T20:30:00',
                version: 'VF',
                prix: 12.5,
                idFilm: 1,
                idSalle: 2
            },
            {
                idSeance: 2,
                dateHeure: '2026-10-26T20:30:00',
                version: 'VF',
                prix: 12.5,
                idFilm: 1,
                idSalle: 2
            }
        ];

        service.getAllSeances().subscribe(
            seances => {
                expect(seances).toEqual(seancesMock);
            }
        );

        const requete =
            httpTestingController.expectOne(
                'http://localhost:8080/api/admin/seances'
            );

        expect(requete.request.method).toBe('GET');

        //on simule la réponse du backend avec les données mockées
        requete.flush(seancesMock);
    });


    it('should supprimer une séance', () => {

        const idSeance = 1;

        service.deleteSeance(idSeance).subscribe();

        const requete =
            httpTestingController.expectOne(
                `http://localhost:8080/api/admin/seances/${idSeance}`
            );

        expect(requete.request.method).toBe('DELETE');

        requete.flush(null); // on simule une réponse vide du backend
    });

    it('should créer une séance', () => {

        const request = {

            dateHeure: '2026-10-25T20:30:00',
            version: 'VF',
            prix: 12.5,
            idFilm: 1,
            idSalle: 2
        };

        const seanceMock = {
            idSeance: 1,
            dateHeure: '2026-10-25T20:30:00',
            version: 'VF',
            prix: 12.5,
            idFilm: 1,
            idSalle: 2
        };

        service.createSeance(request).subscribe(
            seances => {
                expect(seances.dateHeure).toEqual(request.dateHeure);
                expect(seances.version).toEqual(request.version);
                expect(seances.prix).toEqual(request.prix);
                expect(seances.idFilm).toEqual(request.idFilm);
                expect(seances.idSalle).toEqual(request.idSalle);
            }
        );

        const requete =
            httpTestingController.expectOne(
                'http://localhost:8080/api/admin/seances'
            );

        expect(requete.request.method).toBe('POST');

        expect(requete.request.body).toEqual(request);

        requete.flush(seanceMock);

    });

});