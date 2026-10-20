import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Film } from '../../films/films';
import { Salle } from '../salle';

import { AdminFilmService } from '../admin-film-service';
import { AdminSalleService } from '../admin-salle-service';
import { AdminSeanceService } from '../admin-seance-service';

import { CreateSeanceRequest } from '../create-seance-request';

@Component({
  selector: 'app-admin-seance-form',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-seance-form.html',
  styleUrl: './admin-seance-form.scss'
})
export class AdminSeanceForm implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly adminFilmService = inject(AdminFilmService);
  private readonly adminSalleService = inject(AdminSalleService);
  private readonly adminSeanceService = inject(AdminSeanceService);
  private readonly router = inject(Router);

  films = signal<Film[]>([]);
  salles = signal<Salle[]>([]);
  erreur = signal<string | null>(null);

  seanceForm = this.formBuilder.nonNullable.group({
    dateHeure: ['', Validators.required],
    version: ['', Validators.required],
    prix: [0, [Validators.required, Validators.min(0.01)]],
    idFilm: [0, [Validators.required, Validators.min(1)]],
    idSalle: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {

    this.adminFilmService.getAllFilms().subscribe({
      next: (films) => {
        this.films.set(films);
      },
      error: () => {
        this.erreur.set(
          'Impossible de charger les films.'
        );
      }
    });

    this.adminSalleService.getAllSalles().subscribe({
      next: (salles) => {
        this.salles.set(salles);
      },
      error: () => {
        this.erreur.set(
          'Impossible de charger les salles.'
        );
      }
    });
  }

  creerSeance(): void {

    if (this.seanceForm.invalid) {
      this.seanceForm.markAllAsTouched();
      return;
    }

    //déclaration de la requete de type CreateSeanceRequest
    const request: CreateSeanceRequest =
      this.seanceForm.getRawValue();

    this.adminSeanceService
      .createSeance(request)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/seances']); //retourne à la liste des séances une fois la création validée
        },
        error: () => {
          this.erreur.set(
            'Impossible de créer la séance.'
          );
        }
      });
  }
}