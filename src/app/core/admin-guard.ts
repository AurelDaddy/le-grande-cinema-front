import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

export const adminGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const utilisateur = authService.utilisateurConnecte();

  // Aucun utilisateur connecté
  if (!utilisateur) {
    return router.createUrlTree(['/login']);
  }

  // Utilisateur connecté mais non administrateur
  if (utilisateur.typeUtilisateur !== 'ADMIN') {
    return router.createUrlTree(['/']);
  }

  // Administrateur connecté
  return true;
};