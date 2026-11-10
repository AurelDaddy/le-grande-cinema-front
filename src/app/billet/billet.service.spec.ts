import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { BilletService } from './billet.service';
import { Billet } from './billet.model';

describe('BilletService', () => {

  let service: BilletService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        BilletService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(BilletService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should récupérer les billets d un utilisateur', () => {

    const billetsMock: Billet[] = [
      {
        idReservation: 1,
        titreFilm: 'Inception',
        dateHeure: '2026-10-22T20:30:00',
        version: 'VOSTFR',
        numeroSalle: 2,
        places: ['A1', 'A2'],
        prenom: 'Jean',
        nom: 'Dupont',
        referencePaiement: 'CINE123456'
      },
      {
        idReservation: 2,
        titreFilm: 'Interstellar',
        dateHeure: '2026-10-23T19:00:00',
        version: 'VF',
        numeroSalle: 1,
        places: ['B4'],
        prenom: 'Jean',
        nom: 'Dupont',
        referencePaiement: 'CINE654321'
      }
    ];

    service
      .getBilletsUtilisateur()
      .subscribe(billets => {

        expect(billets)
          .toEqual(billetsMock);
      });

    const requete = httpTestingController.expectOne(
      'http://localhost:8080/api/billets'
    );

    expect(requete.request.method)
      .toBe('GET');

    requete.flush(billetsMock);
  });

  it('should récupérer un billet par réservation', () => {

    const idReservation = 3;

    const billetMock: Billet = {
      idReservation: 3,
      titreFilm: 'Dune',
      dateHeure: '2026-10-24T21:00:00',
      version: 'VOSTFR',
      numeroSalle: 3,
      places: ['C5', 'C6'],
      prenom: 'Marie',
      nom: 'Martin',
      referencePaiement: 'CINE789123'
    };

    service
      .getBilletByReservation(idReservation)
      .subscribe(billet => {

        expect(billet)
          .toEqual(billetMock);
      });

    const requete = httpTestingController.expectOne(
      'http://localhost:8080/api/billets/3'
    );

    expect(requete.request.method)
      .toBe('GET');

    requete.flush(billetMock);
  });

});