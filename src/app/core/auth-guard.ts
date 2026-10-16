import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  //si un utilisateur est bien connecté
  const utilisateur = authService.utilisateurConnecte();

  if (utilisateur) {
    return true;
  }
  //sinon, redirige vers la page de login
  return router.createUrlTree(['/login']);
};