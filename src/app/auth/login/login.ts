import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
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
    private router: Router
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

        this.router.navigate(['/']);
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