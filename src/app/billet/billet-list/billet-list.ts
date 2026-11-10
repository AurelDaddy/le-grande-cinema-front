
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { BilletService } from '../billet.service';
import { Billet } from '../billet.model';

@Component({
  selector: 'app-billet-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './billet-list.html',
  styleUrl: './billet-list.scss'
})
export class BilletList {

  private readonly billetService = inject(BilletService);

  protected readonly billets =
    signal<Billet[]>([]);

  protected readonly erreur =
    signal<string | null>(null);

  //Indique si les billets sont en cours de chargement
  protected readonly chargement = signal(true);

  ngOnInit(): void {

    this.billetService
      .getBilletsUtilisateur()
      .subscribe({
        next: (billets) => {
          this.billets.set(billets);
          this.erreur.set(null);
          this.chargement.set(false);
        },
        error: () => {
          this.erreur.set(
            'Impossible de récupérer vos billets.'
          );
          this.chargement.set(false);
        }
      });
  }
}
