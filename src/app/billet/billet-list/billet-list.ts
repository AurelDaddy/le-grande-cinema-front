import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BilletService } from '../billet.service';
import { Billet } from '../billet.model';

@Component({
  selector: 'app-billet-list',
  imports: [RouterLink],
  templateUrl: './billet-list.html',
  styleUrl: './billet-list.scss'
})
export class BilletList {

  private readonly billetService = inject(BilletService);

  protected readonly billets =
    signal<Billet[]>([]);

  protected readonly erreur =
    signal<string | null>(null);

  ngOnInit(): void {

    this.billetService
      .getBilletsUtilisateur()
      .subscribe({
        next: (billets) => {
          this.billets.set(billets);
        },
        error: () => {
          this.erreur.set(
            'Impossible de récupérer vos billets.'
          );
        }
      });
  }
}