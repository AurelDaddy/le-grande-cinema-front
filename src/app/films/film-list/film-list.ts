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

  constructor(private filmService: FilmService) {}

  ngOnInit(): void {
    this.filmService.getFilms().subscribe({
      next: (films) => {
        console.log('Films reçu :', films);
      this.films.set(films);
    },
      error: (error) => {
        console.error('Erreur lors du chargement des films:', error);
      }
    });
  }
}
