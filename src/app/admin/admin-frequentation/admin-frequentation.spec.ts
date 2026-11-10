import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { AdminFrequentation } from './admin-frequentation';
import { AdminFrequentationService } from '../admin-frequentation.service';

describe('AdminFrequentation', () => {

  let component: AdminFrequentation;
  let fixture: ComponentFixture<AdminFrequentation>;

  // on mocke adminFrequentationService pour les tests en utilisant vitest
  const adminFrequentationServiceMock = {
    getTauxDeRemplissageParPeriode: vi.fn()
  };

  beforeEach(async () => {

    adminFrequentationServiceMock
      .getTauxDeRemplissageParPeriode
      .mockReset();

    await TestBed.configureTestingModule({
      imports: [
        AdminFrequentation
      ],
      providers: [
        {
          provide: AdminFrequentationService,
          useValue: adminFrequentationServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(AdminFrequentation);

    component =
      fixture.componentInstance;
  });

  it('should ne pas calculer la fréquentation si le formulaire est invalide', () => {

    //on ne remplit rien dans frequentationForm et on lance calculerFrequentation()
    component.calculerFrequentation();

    //on s'attend à ce que le service ne soit jamais appelé car le formulaire est invalide
    //grace a vitest on peut savoir: 'notHaveBeenCalled'
    expect(
      adminFrequentationServiceMock
        .getTauxDeRemplissageParPeriode
    ).not.toHaveBeenCalled();
  });

  it('should calculer le taux de remplissage pour une période valide', () => {

    adminFrequentationServiceMock
      .getTauxDeRemplissageParPeriode
      .mockReturnValue(of(75));

    //cette fois-ci on remplit le formulaire
    component.frequentationForm.setValue({
      dateDebut: '2026-10-01',
      dateFin: '2026-10-31'
    });

    component.calculerFrequentation();

    expect(
      adminFrequentationServiceMock
        .getTauxDeRemplissageParPeriode
    ).toHaveBeenCalledWith(
      '2026-10-01',
      '2026-10-31'
    );

    expect(component.tauxRemplissage())
      .toBe(75);

    expect(component.erreur())
      .toBeNull();
  });

  it('should afficher une erreur si le calcul de fréquentation échoue', () => {

    adminFrequentationServiceMock
      .getTauxDeRemplissageParPeriode
      .mockReturnValue(
        throwError(
          () => new Error('Erreur fréquentation')
        )
      );

    component.frequentationForm.setValue({
      dateDebut: '2026-10-01',
      dateFin: '2026-10-31'
    });

    component.calculerFrequentation();

    expect(component.erreur())
      .toBe(
        'Impossible de calculer la fréquentation.'
      );
  });

});