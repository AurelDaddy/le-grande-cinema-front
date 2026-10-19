import { StatutPaiement } from './statut-paiement';

export interface Paiement {
  idPaiement: number;
  montant: number;
  datePaiement: string;
  statut: StatutPaiement;
  referencePaiement: string;
  idReservation: number;
}