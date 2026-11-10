import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting
} from '@angular/common/http/testing';

import { PaiementService } from './paiement.service';

describe('PaiementService', () => {

    let service: PaiementService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                PaiementService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        service = TestBed.inject(PaiementService);

        httpTestingController = TestBed.inject(HttpTestingController);

    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should créer un paiement', () => {

        const idReservation = 2;

        const paiementMock = {

            idPaiement: 5,
            montant: 12.5,
            datePaiement: '2026-10-22T09:30:00',
            statut: 'ACCEPTE',
            referencePaiement: 'CINE123456',
            idReservation: 2
        };

        service
            .effectuerPaiement(idReservation)
            .subscribe(paiement => {

                expect(paiement)
                    .toEqual(paiementMock);
            });

        const requete = httpTestingController.expectOne(
            'http://localhost:8080/api/paiements'
        );

        expect(requete.request.method).toBe('POST');

        expect(requete.request.body).toEqual({
            idReservation
        });

        requete.flush(paiementMock);
    });

});