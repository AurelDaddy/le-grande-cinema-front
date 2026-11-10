import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { adminGuard } from './admin-guard';
import { AuthService } from '../auth/auth.service';
import { Utilisateur } from '../auth/utilisateur';

describe('adminGuard', () => { //regroupe tous les tests concernant adminGuard

  let utilisateurMock: Utilisateur | null;

  let redirectionDemandee: string[] | null;

  const authServiceMock = {
    utilisateurConnecte: () => utilisateurMock
  };

  const routerMock = {
    createUrlTree: (commands: string[]) => {
      redirectionDemandee = commands;
      return commands;
    }
  };

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(
      () => adminGuard(...guardParameters)
    );

  beforeEach(() => {

    utilisateurMock = null;
    redirectionDemandee = null;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    });
  });

  it('should autoriser un ADMIN', () => {

    utilisateurMock = {
      idUtilisateur: 1,
      prenom: 'Michel',
      nom: 'Dupont',
      email: 'micheldupont@test.fr',
      telephone: null,
      typeUtilisateur: 'ADMIN'
    };

    const resultat = executeGuard(
      {} as any,
      {} as any
    );

    expect(resultat).toBe(true);
  });

  it('should rediriger un CLIENT vers accueil', () => {

    utilisateurMock = {
      idUtilisateur: 2,
      prenom: 'Jean',
      nom: 'Martin',
      email: 'jeanmartin@test.fr',
      telephone: null,
      typeUtilisateur: 'CLIENT'
    };

    const resultat = executeGuard(
      {} as any,
      {} as any
    );

    expect(redirectionDemandee).toEqual(['/']);
    expect(resultat).toEqual(['/']);
  });

  it('should rediriger un utilisateur non connecté vers login', () => {

    utilisateurMock = null;

    const resultat = executeGuard(
      {} as any,
      {} as any
    );

    expect(redirectionDemandee).toEqual(['/login']);
    expect(resultat).toEqual(['/login']);
  });

});