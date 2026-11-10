import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  messageErreur = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    motDePasse: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  connecter(): void {

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.controls.email.value;
    const motDePasse = this.loginForm.controls.motDePasse.value;

    this.authService.login(email, motDePasse).subscribe({
      next: (utilisateur) => {
        console.log('Utilisateur connecté :', utilisateur);

        this.messageErreur.set(null);

        //récupère l'url voulu au moment de la connexion
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl');

        //si cet url est valide (commence par / et pas par //)
        const destination =
          returnUrl?.startsWith('/') && !returnUrl.startsWith('//')
          //alors detination prends l'url voulu, sinon page d'accueil
            ? returnUrl
            : '/';
        
        this.router.navigateByUrl(destination);
      },

      error: (error) => {
        console.error(
          'Erreur lors de la connexion',
          error
        );

        this.messageErreur.set(
          'Email ou mot de passe incorrect.'
        );
      }
    });
  }
}