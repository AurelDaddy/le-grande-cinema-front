import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AdminSeanceList } from './admin-seance-list';
import { AdminSeanceService } from '../admin-seance.service';
import { Seance } from '../../films/seance';

describe('AdminSeanceList', () => {

  let component: AdminSeanceList;
  let fixture: ComponentFixture<AdminSeanceList>;

  const seancesMock: Seance[] = [
    {
      idSeance: 1,
      dateHeure: '2026-10-22T20:00:00',
      version: 'VF',
      prix: 12.5,
      idFilm: 1,
      idSalle: 1
    },
    {
      idSeance: 2,
      dateHeure: '2026-10-23T21:00:00',
      version: 'VOSTFR',
      prix: 14,
      idFilm: 2,
      idSalle: 2
    }
  ];

  const adminSeanceServiceMock = {
    getAllSeances: () => of(seancesMock),
    deleteSeance: () => of(void 0)
  };

  beforeEach(async () => {

    // On remet le mock dans son état normal
    // avant chaque test.
    adminSeanceServiceMock.getAllSeances =
      () => of(seancesMock);

    adminSeanceServiceMock.deleteSeance =
      () => of(void 0);

    await TestBed.configureTestingModule({
      imports: [
        AdminSeanceList
      ],
      providers: [
        provideRouter([]),
        {
          provide: AdminSeanceService,
          useValue: adminSeanceServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(AdminSeanceList);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should charger les séances', () => {

    expect(component.seances())
      .toEqual(seancesMock);
  });

  it('should supprimer une séance de la liste', () => {

    component.deleteSeance(1);

    expect(component.seances())
      .toEqual([
        seancesMock[1]
      ]);
  });

  it('should afficher une erreur si la suppression échoue', () => {

    adminSeanceServiceMock.deleteSeance =
      () =>
        throwError(
          () => new Error('Erreur suppression')
        );

    component.deleteSeance(1);

    expect(component.erreur())
      .toBe(
        'Impossible de supprimer cette séance.'
      );
  });

});