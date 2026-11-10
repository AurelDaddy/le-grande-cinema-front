import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

import { Header } from './header';
import { AuthService } from '../../auth/auth.service';

describe('Header', () => {

  let component: Header;
  let fixture: ComponentFixture<Header>;

  const authServiceMock = {
    logout: vi.fn(),
    utilisateurConnecte: () => null
  };

  beforeEach(async () => {

    authServiceMock.logout.mockReset();

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should déconnecter l’utilisateur et rediriger vers l’accueil', () => {

    const router = TestBed.inject(Router);

    //on crée une constante qui espionne la méthode navigate du router
    //et mémorise les appels à cette méthode
    const navigateSpy =
      vi.spyOn(router, 'navigate')
        .mockResolvedValue(true);

    component.deconnecter();

    expect(authServiceMock.logout)
      .toHaveBeenCalled();


    //vérifie que la navigation vers l'accueil a été appelée
    expect(navigateSpy)
      .toHaveBeenCalledWith(['/']);
  });

});