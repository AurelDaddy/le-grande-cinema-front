import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { ReservationService } from './reservation.service';

describe('ReservationService', () => {

  let service: ReservationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ReservationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service =
      TestBed.inject(ReservationService);

    httpTestingController =
      TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should créer une réservation', () => {

    const idSeance = 3;
    const nombrePlaces = 2;

    const reservationMock = {
      idReservation: 10,
      dateReservation: '2026-10-22T09:30:00',
      statut: 'EN_ATTENTE',
      idUtilisateur: 5,
      idSeance: 3
    };

    service
      .creerReservation(idSeance, nombrePlaces)
      .subscribe(reservation => {

        expect(reservation)
          .toEqual(reservationMock);
      });

    const requete =
      httpTestingController.expectOne(
        'http://localhost:8080/api/reservations'
      );

    expect(requete.request.method)
      .toBe('POST');

    // on vérifie que la corps de la requète contien bien l'idSeance aqinsi que le nombre de Place  
    expect(requete.request.body)
      .toEqual({
        idSeance,
        nombrePlaces
      });
    
    //simule la réponse du backend avec la réservation mockée
    requete.flush(reservationMock);
  });

});