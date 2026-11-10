export interface Billet {
  idReservation: number;
  titreFilm: string;
  dateHeure: string;
  version: string;
  numeroSalle: number;
  places: string[];
  prenom: string;
  nom: string;
  referencePaiement: string;
}