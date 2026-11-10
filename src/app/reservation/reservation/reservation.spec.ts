import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Reservation } from './reservation';
import { SeanceService } from '../../films/seance.service';
import { ReservationService } from '../reservation.service';
import { Reservation as ReservationModel } from '../reservation.model';

describe('Reservation', () => {

  let component: Reservation;
  let fixture: ComponentFixture<Reservation>;

  const reservationMock: ReservationModel = {
    idReservation: 10,
    dateReservation: '2026-10-26T10:00:00',
    statut: 'EN_ATTENTE',
    idUtilisateur: 3,
    idSeance: 5
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (parametre: string) => {
          if (parametre === 'idSeance') {
            return '5';
          }

          return null;
        }
      }
    }
  };

  const seanceServiceMock = {
    getNombrePlacesDisponibles: vi.fn()
  };

  const reservationServiceMock = {
    creerReservation: vi.fn()
  };

  beforeEach(async () => {

    seanceServiceMock
      .getNombrePlacesDisponibles
      .mockReset();

    reservationServiceMock
      .creerReservation
      .mockReset();

    seanceServiceMock
      .getNombrePlacesDisponibles
      .mockReturnValue(of(25));

    reservationServiceMock
      .creerReservation
      .mockReturnValue(of(reservationMock));

    await TestBed.configureTestingModule({
      imports: [
        Reservation
      ],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: SeanceService,
          useValue: seanceServiceMock
        },
        {
          provide: ReservationService,
          useValue: reservationServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(Reservation);

    component =
      fixture.componentInstance;
  });

  it('should charger le nombre de places disponibles', () => {

    fixture.detectChanges();

    expect(
      seanceServiceMock.getNombrePlacesDisponibles
    ).toHaveBeenCalledWith(5);

    expect(
      component['nombrePlacesDisponibles']()
    ).toBe(25);
  });

  it('should modifier le nombre de places', () => {

    const input = document.createElement('input');
    input.value = '3';

    const event = {
      target: input
    } as unknown as Event;

    component.changerNombrePlaces(event);

    expect(
      component['nombrePlaces']()
    ).toBe(3);
  });

  it('should créer une réservation avec le bon nombre de places', () => {

    component['nombrePlaces'].set(2);

    component.reserver();

    expect(
      reservationServiceMock.creerReservation
    ).toHaveBeenCalledWith(5, 2);

    expect(
      component['reservationCreee']()
    ).toEqual(reservationMock);
  });

  it('should afficher une erreur si le chargement des places échoue', () => {

    seanceServiceMock
      .getNombrePlacesDisponibles
      .mockReturnValue(
        throwError(
          () => new Error('Erreur places')
        )
      );

    fixture.detectChanges();

    expect(
      component['erreur']()
    ).toBe(
      'Impossible de récupérer les places disponibles.'
    );
  });

  it('should afficher une erreur si la réservation échoue', () => {

    reservationServiceMock
      .creerReservation
      .mockReturnValue(
        throwError(
          () => new Error('Erreur réservation')
        )
      );

    component.reserver();

    expect(
      component['erreur']()
    ).toBe(
      'Impossible de créer la réservation.'
    );
  });

});