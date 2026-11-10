import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { AdminFrequentationService } from '../admin-frequentation.service';

@Component({
  selector: 'app-admin-frequentation',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './admin-frequentation.html',
  styleUrl: './admin-frequentation.scss'
})
export class AdminFrequentation {

  private readonly formBuilder = inject(FormBuilder);
  private readonly adminFrequentationService =
    inject(AdminFrequentationService);

  tauxRemplissage = signal<number | null>(null);
  erreur = signal<string | null>(null);

  frequentationForm = this.formBuilder.nonNullable.group({
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required]
  });

  calculerFrequentation(): void {

    if (this.frequentationForm.invalid) {
      this.frequentationForm.markAllAsTouched();
      return;
    }

    const { dateDebut, dateFin } =
      this.frequentationForm.getRawValue();

    this.adminFrequentationService
      .getTauxDeRemplissageParPeriode(
        dateDebut,
        dateFin
      )
      .subscribe({
        next: (taux) => {
          this.tauxRemplissage.set(taux);
          this.erreur.set(null);
        },
        error: () => {
          this.erreur.set(
            'Impossible de calculer la fréquentation.'
          );
        }
      });
  }
}