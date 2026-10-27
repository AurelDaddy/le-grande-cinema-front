import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { AuthService } from './auth/auth.service';

describe('App', () => {

  const authServiceMock = {
    utilisateurConnecte: () => null,
    logout: () => {}
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        App
      ],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    }).compileComponents();
  });

  it('should afficher la structure principale de l’application', () => {

    const fixture =
      TestBed.createComponent(App);

    fixture.detectChanges();

    const compiled =
      fixture.nativeElement as HTMLElement;

    expect(
      compiled.querySelector('app-header')
    ).toBeTruthy();

    expect(
      compiled.querySelector('main')
    ).toBeTruthy();

    expect(
      compiled.querySelector('router-outlet')
    ).toBeTruthy();

    expect(
      compiled.querySelector('app-footer')
    ).toBeTruthy();
  });

});