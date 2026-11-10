import { inject } from '@angular/core';
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {

  const authService = inject(AuthService); //récupère AuthService depuis l'injection de dépendances d'Angular

  const credentials = authService.getCredentials(); //récupère les crédentials enregistrés au moment du login

  if (!credentials) {
    return next(req);
  }

  const requeteAuthentifiee = req.clone({
    setHeaders: {
      Authorization: `Basic ${credentials}`
    }
  });

  return next(requeteAuthentifiee);
};