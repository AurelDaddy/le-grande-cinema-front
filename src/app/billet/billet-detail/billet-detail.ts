import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BilletService } from '../billet.service';
import { Billet } from '../billet.model';

@Component({
  selector: 'app-billet-detail',
  imports: [],
  templateUrl: './billet-detail.html',
  styleUrl: './billet-detail.scss'
})
export class BilletDetail {

  private readonly route = inject(ActivatedRoute);
  private readonly billetService = inject(BilletService);

  protected readonly billet =
    signal<Billet | null>(null);

  protected readonly erreur =
    signal<string | null>(null);

  ngOnInit(): void {

    const idReservation =
      Number(
        this.route.snapshot.paramMap.get('idReservation')
      );

    this.billetService
      .getBilletByReservation(idReservation)
      .subscribe({
        next: (billet) => {
          this.billet.set(billet);
        },
        error: () => {
          this.erreur.set(
            'Impossible de récupérer ce billet.'
          );
        }
      });
  }
}