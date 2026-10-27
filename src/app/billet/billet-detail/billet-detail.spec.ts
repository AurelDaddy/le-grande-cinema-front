import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { BilletDetail } from './billet-detail';
import { BilletService } from '../billet.service';
import { Billet } from '../billet.model';

describe('BilletDetail', () => {

  let component: BilletDetail;
  let fixture: ComponentFixture<BilletDetail>;

  const billetMock: Billet = {
    idReservation: 2,
    titreFilm: 'Inception',
    dateHeure: '2026-10-27T20:00:00',
    version: 'VOSTFR',
    numeroSalle: 1,
    places: ['A1', 'A2'],
    prenom: 'Jean',
    nom: 'Dupont',
    referencePaiement: 'CINE123456'
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (parametre: string) => {
          if (parametre === 'idReservation') {
            return '2';
          }

          return null;
        }
      }
    }
  };

  const billetServiceMock = {
    getBilletByReservation: vi.fn()
  };

  beforeEach(async () => {

    billetServiceMock
      .getBilletByReservation
      .mockReset();

    billetServiceMock
      .getBilletByReservation
      .mockReturnValue(
        of(billetMock)
      );

    await TestBed.configureTestingModule({
      imports: [
        BilletDetail
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: BilletService,
          useValue: billetServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(BilletDetail);

    component =
      fixture.componentInstance;
  });

  it('should charger le billet correspondant à la réservation', () => {

    fixture.detectChanges();

    expect(
      billetServiceMock.getBilletByReservation
    ).toHaveBeenCalledWith(2);

    expect(
      component['billet']()
    ).toEqual(billetMock);
  });

  it('should afficher une erreur si le chargement du billet échoue', () => {

    billetServiceMock
      .getBilletByReservation
      .mockReturnValue(
        throwError(
          () => new Error('Erreur billet')
        )
      );

    fixture.detectChanges();

    expect(
      component['erreur']()
    ).toBe(
      'Impossible de récupérer ce billet.'
    );
  });

});