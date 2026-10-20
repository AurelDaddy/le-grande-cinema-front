import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminFilmService } from '../admin-film-service';
import { CreateFilmRequest } from '../create-film-request';

@Component({
  selector: 'app-admin-film-form',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-film-form.html',
  styleUrl: './admin-film-form.scss'
})
export class AdminFilmForm {

  private readonly formBuilder = inject(FormBuilder);
  private readonly adminFilmService = inject(AdminFilmService);
  private readonly router = inject(Router);

  erreur = signal<string | null>(null);

  filmForm = this.formBuilder.nonNullable.group({
    titre: ['', Validators.required],
    dureeMinute: [0, [Validators.required, Validators.min(1)]],
    anneeSortie: [0, [Validators.required, Validators.min(1888)]],
    genre: ['', Validators.required],
    realisateur: ['', Validators.required],
    synopsis: ['', Validators.required],
    urlAffiche: ['', Validators.required]
  });

  creerFilm(): void {

    if (this.filmForm.invalid) {
      this.filmForm.markAllAsTouched();
      return;
    }

    const request: CreateFilmRequest =
      this.filmForm.getRawValue();

    this.adminFilmService
      .createFilm(request)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.erreur.set(
            'Impossible de créer le film.'
          );
        }
      });
  }
}