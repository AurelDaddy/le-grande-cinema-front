import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AdminReservationList } from './admin-reservation-list';
import { AdminSeanceService } from '../admin-seance.service';
import { AdminFrequentationService } from '../admin-frequentation.service';
import { Reservation } from '../../reservation/reservation.model';
import { StatutReservation } from '../../reservation/statut-reservation';

describe('AdminReservationList', () => {

  let component: AdminReservationList;
  let fixture: ComponentFixture<AdminReservationList>;

  const reservationsMock: Reservation[] = [
    {
      idReservation: 1,
      dateReservation: '2026-10-26T09:00:00',
      statut: 'CONFIRMEE',
      idUtilisateur: 3,
      idSeance: 5
    }
  ];

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

  const adminSeanceServiceMock = {
    getReservationsBySeance:
      (idSeance: number) => of(reservationsMock)
  };

  const adminFrequentationServiceMock = {
    getTauxDeRemplissage:
      (idSeance: number) => of(75)
  };

  beforeEach(async () => {

    adminSeanceServiceMock.getReservationsBySeance =
      (idSeance: number) => of(reservationsMock);

    adminFrequentationServiceMock.getTauxDeRemplissage =
      (idSeance: number) => of(75);

    await TestBed.configureTestingModule({
      imports: [
        AdminReservationList
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: AdminSeanceService,
          useValue: adminSeanceServiceMock
        },
        {
          provide: AdminFrequentationService,
          useValue: adminFrequentationServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(AdminReservationList);

    component =
      fixture.componentInstance;
  });

  
  it('should charger les réservations de la séance', () => {

    fixture.detectChanges();

    expect(component.reservations())
      .toEqual(reservationsMock);
  });

  it('should charger le taux de remplissage', () => {

    fixture.detectChanges();

    expect(component.tauxRemplissage())
      .toBe(75);
  });

  it('should afficher une erreur si le chargement des réservations échoue', () => {

    adminSeanceServiceMock.getReservationsBySeance =
      () =>
        throwError(
          () => new Error('Erreur réservations')
        );

    fixture.detectChanges();

    expect(component.erreur())
      .toBe(
        'Impossible de charger les réservations.'
      );
  });

  it('should afficher une erreur si le chargement du taux de remplissage échoue', () => {

    adminFrequentationServiceMock.getTauxDeRemplissage =
      () =>
        throwError(
          () => new Error('Erreur fréquentation')
        );

    fixture.detectChanges();

    expect(component.erreur())
      .toBe(
        'Impossible de charger le taux de remplissage.'
      );
  });

});