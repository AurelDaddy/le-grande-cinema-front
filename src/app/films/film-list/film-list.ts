
import { Component, OnInit, signal } from '@angular/core';
import { FilmService } from '../film.service';
import { Film } from '../films';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-film-list',
  styleUrls: ['./film-list.scss'],
  templateUrl: './film-list.html'
})
export class FilmList implements OnInit {

  films = signal<Film[]>([]);

  //Indique si les films sont en cours de chargement
  chargement = signal(true);

  //Permet d'afficher un message si la requête échoue
  erreur = signal<string | null>(null);

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (films) => {
        console.log('Films reçu :', films);
        this.films.set(films);
        this.erreur.set(null);
        this.chargement.set(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des films:', error);

        this.erreur.set(
          'Impossible de charger les films. Veuillez réessayer plus tard.'
        );

        this.chargement.set(false);
      }
    });
  }
}
