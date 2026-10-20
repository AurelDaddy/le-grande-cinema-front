import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AdminSeanceService } from '../admin-seance-service';
import { Reservation } from '../../reservation/reservation.model';
import { AdminFrequentationService } from '../admin-frequentation-service';

@Component({
  selector: 'app-admin-reservation-list',
  imports: [],
  templateUrl: './admin-reservation-list.html',
  styleUrl: './admin-reservation-list.scss'
})
export class AdminReservationList implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly adminSeanceService =
    inject(AdminSeanceService);
  private readonly adminFrequentationService =
    inject(AdminFrequentationService);

  reservations = signal<Reservation[]>([]);
  erreur = signal<string | null>(null);
  tauxRemplissage = signal<number | null>(null);

  ngOnInit(): void {

    const idSeance = Number(
      this.route.snapshot.paramMap.get('idSeance')
    );

    this.adminSeanceService
      .getReservationsBySeance(idSeance)
      .subscribe({
        next: (reservations) => {
          this.reservations.set(reservations);
        },
        error: () => {
          this.erreur.set(
            'Impossible de charger les réservations.'
          );
        }
      });

    this.adminFrequentationService
      .getTauxDeRemplissage(idSeance)
      .subscribe({
        next: (taux) => {
          this.tauxRemplissage.set(taux);
        },
        error: () => {
          this.erreur.set(
            'Impossible de charger le taux de remplissage.'
          );
        }
      });
  }
}