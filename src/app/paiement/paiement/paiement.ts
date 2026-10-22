import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PaiementService } from '../paiement.service';
import { Paiement as PaiementModel } from '../paiement.model';

@Component({
  selector: 'app-paiement',
  imports: [RouterLink],
  templateUrl: './paiement.html',
  styleUrl: './paiement.scss'
})
export class Paiement {

  private readonly route = inject(ActivatedRoute);
  private readonly paiementService = inject(PaiementService);

  protected readonly paiementEffectue =
    signal<PaiementModel | null>(null);

  protected readonly erreur =
    signal<string | null>(null);

  payer(): void {

    const idReservation =
      Number(
        this.route.snapshot.paramMap.get('idReservation')
      );

    this.erreur.set(null);

    this.paiementService
      .effectuerPaiement(idReservation)
      .subscribe({
        next: (paiement) => {
          this.paiementEffectue.set(paiement);
        },
        error: () => {
          this.erreur.set(
            'Impossible d’effectuer le paiement.'
          );
        }
      });
  }
}