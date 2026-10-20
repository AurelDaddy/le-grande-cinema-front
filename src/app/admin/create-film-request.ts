export interface CreateFilmRequest {
  titre: string;
  dureeMinute: number;
  anneeSortie: number;
  genre: string;
  realisateur: string;
  synopsis: string;
  urlAffiche: string;
}