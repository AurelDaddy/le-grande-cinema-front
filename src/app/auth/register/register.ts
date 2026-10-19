import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AuthService } from '../auth.service';
import { CreateRegisterRequest } from '../create-register-request';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  messageSucces = signal<string | null>(null);
  messageErreur = signal<string | null>(null);

  registerForm = new FormGroup({
    prenom: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    nom: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required, //ici validatorr précise que l'email est nécessaire
        Validators.email // et que son format est correct
      ]
    }),

    motDePasse: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    telephone: new FormControl('')
  });

  constructor(private authService: AuthService) {}

  inscrire(): void {

    if (this.registerForm.invalid) {
      return;
    }

    const request: CreateRegisterRequest = {
      prenom: this.registerForm.controls.prenom.value,
      nom: this.registerForm.controls.nom.value,
      email: this.registerForm.controls.email.value,
      motDePasse: this.registerForm.controls.motDePasse.value,
      telephone:
        this.registerForm.controls.telephone.value || null
    };

    this.authService.inscription(request).subscribe({
      next: (utilisateur) => {
        this.messageErreur.set(null);

        this.messageSucces.set(
          `Compte créé pour ${utilisateur.prenom} ${utilisateur.nom}`
        );
      },

      error: (error) => {
        console.error(
          'Erreur lors de l’inscription',
          error
        );

        this.messageSucces.set(null);

        this.messageErreur.set(
          'Impossible de créer le compte.'
        );
      }
    });
  }
}