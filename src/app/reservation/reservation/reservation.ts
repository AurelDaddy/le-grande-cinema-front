import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';


import { SeanceService } from '../../films/seance.service';
import { ReservationService } from '../reservation.service';
import { Reservation as ReservationModel } from '../reservation.model';

@Component({
  selector: 'app-reservation',
  imports: [RouterLink],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss'
})
export class Reservation {

  private readonly route = inject(ActivatedRoute);
  private readonly seanceService = inject(SeanceService);
  private readonly reservationService = inject(ReservationService);

  protected readonly nombrePlacesDisponibles = signal<number>(0);
  protected readonly nombrePlaces = signal<number>(1);

  protected readonly reservationCreee =
    signal<ReservationModel | null>(null);

  protected readonly erreur =
    signal<string | null>(null);

  ngOnInit(): void {

    const idSeance =
      Number(this.route.snapshot.paramMap.get('idSeance'));

    this.seanceService
      .getNombrePlacesDisponibles(idSeance)
      .subscribe({
        next: (nombre) => {
          this.nombrePlacesDisponibles.set(nombre);
        },
        error: () => {
          this.erreur.set(
            'Impossible de récupérer les places disponibles.'
          );
        }
      });
  }

  changerNombrePlaces(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.nombrePlaces.set(
      Number(input.value)
    );
  }

  reserver(): void {

    const idSeance =
      Number(this.route.snapshot.paramMap.get('idSeance'));

    this.erreur.set(null);

    this.reservationService
      .creerReservation(
        idSeance,
        this.nombrePlaces()
      )
      .subscribe({
        next: (reservation) => {
          this.reservationCreee.set(reservation);
        },
        error: () => {
          this.erreur.set(
            'Impossible de créer la réservation.'
          );
        }
      });
  }
}