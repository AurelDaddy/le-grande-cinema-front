import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../films';
import { FilmService } from '../film.service';
import { Seance } from '../seance';
import { SeanceService } from '../seance.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-film-detail',
  imports: [RouterLink],
  templateUrl: './film-detail.html',
  styleUrl: './film-detail.scss'
})
export class FilmDetail implements OnInit {

  film = signal<Film | null>(null); //on initialise à null
  seances = signal<Seance[]>([]); //on initialise à un tableau vide

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
    const idFilm = Number(this.route.snapshot.paramMap.get('id')); //ici Number que le backend attend un nombre

    //on utilise l'idFilm récupéré pour charger les détails du film et les séances associées
    this.filmService.getFilmById(idFilm).subscribe({
      next: (film) => {
        this.film.set(film);
      },
      error: (error) => {
        console.error('Erreur lors du chargement du film', error);
      }
    });

    this.seanceService.getSeancesByFilm(idFilm).subscribe({
      next: (seances) => {
        this.seances.set(seances);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des séances', error);
      }
    });
  }
}