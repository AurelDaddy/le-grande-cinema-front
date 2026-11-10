import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { FilmDetail } from './film-detail';
import { FilmService } from '../film.service';
import { SeanceService } from '../seance.service';
import { Film } from '../films';
import { Seance } from '../seance';

describe('FilmDetail', () => {

  let component: FilmDetail;
  let fixture: ComponentFixture<FilmDetail>;

  const filmMock: Film = {
    idFilm: 5,
    titre: 'Inception',
    dureeMinute: 148,
    anneeSortie: 2010,
    genre: 'Science-fiction',
    realisateur: 'Christopher Nolan',
    synopsis: 'Un voleur infiltre les rêves.',
    urlAffiche: 'inception.jpg'
  };

  const seancesMock: Seance[] = [
    {
      idSeance: 1,
      dateHeure: '2026-10-26T20:00:00',
      version: 'VOSTFR',
      prix: 12.5,
      idFilm: 5,
      idSalle: 1
    },
    {
      idSeance: 2,
      dateHeure: '2026-10-27T18:30:00',
      version: 'VF',
      prix: 11,
      idFilm: 5,
      idSalle: 2
    }
  ];

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (parametre: string) => {
          if (parametre === 'id') {
            return '5';
          }

          return null;
        }
      }
    }
  };

  const filmServiceMock = {
    getFilmById: (idFilm: number) =>
      of(filmMock)
  };

  const seanceServiceMock = {
    getSeancesByFilm: (idFilm: number) =>
      of(seancesMock)
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        FilmDetail
      ],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock
        },
        {
          provide: FilmService,
          useValue: filmServiceMock
        },
        {
          provide: SeanceService,
          useValue: seanceServiceMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(FilmDetail);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should charger le film', () => {

    expect(component.film())
      .toEqual(filmMock);
  });

  it('should charger les séances du film', () => {

    expect(component.seances())
      .toEqual(seancesMock);
  });
  
});