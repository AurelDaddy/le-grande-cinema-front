
import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { AdminSeanceService } from '../admin-seance.service';
import { AdminFilmService } from '../admin-film.service';
import { AdminSalleService } from '../admin-salle.service';

import { Seance } from '../../films/seance';
import { Film } from '../../films/films';
import { Salle } from '../salle';

@Component({
  selector: 'app-admin-seance-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-seance-list.html',
  styleUrl: './admin-seance-list.scss'
})
export class AdminSeanceList implements OnInit {

  private readonly adminSeanceService = inject(AdminSeanceService);
  private readonly adminFilmService = inject(AdminFilmService);
  private readonly adminSalleService = inject(AdminSalleService);

  seances = signal<Seance[]>([]);
  films = signal<Film[]>([]);
  salles = signal<Salle[]>([]);

  erreur = signal<string | null>(null);
  chargement = signal(true);

  ngOnInit(): void {

    //On récupère les séances, les films et les salles afin d'afficher
    //les titres des films et les vrais numéros de salle
    forkJoin({
      seances: this.adminSeanceService.getAllSeances(),
      films: this.adminFilmService.getAllFilms(),
      salles: this.adminSalleService.getAllSalles()
    }).subscribe({

      next: ({ seances, films, salles }) => {

        console.log("Séances reçus : ", seances);

        this.seances.set(seances);
        this.films.set(films);
        this.salles.set(salles);

        this.chargement.set(false);
      },

      error: (err) => {

        console.error('Erreur GET séances : ', err);

        this.erreur.set(
          'Impossible de charger les données des séances.'
        );

        this.chargement.set(false);
      }
    });
  }

  //On recherche le film correspondant à l'idFilm de la séance
  //afin d'afficher son titre plutôt que son identifiant
  titreFilm(idFilm: number): string {

    const film = this.films().find(
      film => film.idFilm === idFilm
    );

    return film?.titre ?? `Film #${idFilm}`;
  }

  //On recherche la salle correspondant à l'idSalle
  //pour afficher son véritable numéro
  numeroSalle(idSalle: number): string {

    const salle = this.salles().find(
      salle => salle.idSalle === idSalle
    );

    return salle
      ? `Salle ${salle.numeroSalle}`
      : `Salle #${idSalle}`;
  }

  deleteSeance(idSeance: number): void {

    this.adminSeanceService
      .deleteSeance(idSeance)
      .subscribe({

        next: () => {

          //On met à jour localement la liste de séances en retirant celle que l'on vient de supprimer
          //évite une requète http supplémentaire pour recharger les séances
          this.seances.update(
            seances =>
              seances.filter(
                seance => seance.idSeance !== idSeance
              )
          );
        },

        error: () => {
          this.erreur.set(
            'Impossible de supprimer cette séance.'
          );
        }
      });
  }
}
