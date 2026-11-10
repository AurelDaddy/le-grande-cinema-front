export interface CreateRegisterRequest {
  prenom: string;
  nom: string;
  email: string;
  motDePasse: string;
  telephone: string | null;
}