
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  // Injection des services
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // État du menu mobile
  protected readonly menuOuvert = signal(false);

  // Ouvre ou ferme le menu mobile
  basculerMenu(): void {
    this.menuOuvert.update(ouvert => !ouvert);
  }

  // Ferme le menu mobile
  fermerMenu(): void {
    this.menuOuvert.set(false);
  }

  // Déconnecte l'utilisateur
  deconnecter(): void {
    this.authService.logout();
    this.fermerMenu();
    this.router.navigate(['/']);
  }
}
