import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Paiement } from './paiement';
import { PaiementService } from '../paiement.service';
import { Paiement as PaiementModel } from '../paiement.model';

describe('Paiement', () => {

  let component: Paiement;
  let fixture: ComponentFixture<Paiement>;

  //creation d'un mock de paiement
  const paiementMock: PaiementModel = {
    idPaiement: 5,
    montant: 12.5,
    datePaiement: '2026-10-27T09:00:00',
    statut: 'ACCEPTE',
    referencePaiement: 'CINE123456',
    idReservation: 2
  };

  //creation de la route qui simule l'activation de la route avec l'idReservation
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

  //creation d'un mock du service de paiement
  const paiementServiceMock = {
    effectuerPaiement: vi.fn()
  };

  //initialisation du composant avant chaque test
  beforeEach(async () => {

    paiementServiceMock
      .effectuerPaiement
      .mockReset();

    paiementServiceMock
      .effectuerPaiement
      .mockReturnValue(
        of(paiementMock)
      );

    await TestBed.configureTestingModule({
      imports: [
        Paiement
      ],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: PaiementService,
          useValue: paiementServiceMock
        }
      ]
    }).compileComponents();

    //creation du fixture du composant
    fixture =
      TestBed.createComponent(Paiement);
    
    //recuperation de l'instance du composantng test
    component =
      fixture.componentInstance;
  });

  it('should effectuer le paiement de la réservation', () => {

    //appel de la méthode payer du composant
    component.payer();

    expect(
      paiementServiceMock.effectuerPaiement
    ).toHaveBeenCalledWith(2);

    expect(
      component['paiementEffectue']()
    ).toEqual(paiementMock);
  });

  it('should afficher une erreur si le paiement échoue', () => {

    paiementServiceMock
      .effectuerPaiement
      .mockReturnValue(
        throwError(
          () => new Error('Erreur paiement')
        )
      );

    component.payer();

    expect(
      component['erreur']()
    ).toBe(
      'Impossible d’effectuer le paiement.'
    );
  });

});