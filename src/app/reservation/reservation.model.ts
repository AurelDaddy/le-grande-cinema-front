import { StatutReservation } from './statut-reservation';

export interface Reservation {
  idReservation: number;
  dateReservation: string;
  statut: StatutReservation;
  idUtilisateur: number;
  idSeance: number;
}