export interface Utilisateur {
  idUtilisateur: number;
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  typeUtilisateur: 'CLIENT' | 'ADMIN';
}