import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AdminSeanceService } from '../admin-seance-service';
import { Seance } from '../../films/seance';

@Component({
  selector: 'app-admin-seance-list',
  imports: [RouterLink],
  templateUrl: './admin-seance-list.html',
  styleUrl: './admin-seance-list.scss'
})
export class AdminSeanceList implements OnInit {

  private readonly adminSeanceService = inject(AdminSeanceService);

  seances = signal<Seance[]>([]);
  erreur = signal<string | null>(null);

  ngOnInit(): void {
    this.adminSeanceService.getAllSeances().subscribe({
      next: (seances) => {
        console.log("Séances reçus : ", seances);
        this.seances.set(seances);
      },
      error: (err) => {
        console.error('Erreur GET séances : ', err);
        
        this.erreur.set(
          'Impossible de charger les séances.'
        );
      }
    });
  }

  deleteSeance(idSeance: number): void {

  this.adminSeanceService
    .deleteSeance(idSeance)
    .subscribe({
      next: () => {

        //On met à jour localement la liste de séances en retirant celle que l'on vient de supprimer
        //évite une requète http supplémentaire pour recharger les séances
        this.seances.update(
          seances =>
            seances.filter(
              seance => seance.idSeance !== idSeance
            )
        );
      },
      error: () => {
        this.erreur.set(
          'Impossible de supprimer cette séance.'
        );
      }
    });
}

  
}