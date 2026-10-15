import { Routes } from '@angular/router';
import { FilmList } from './films/film-list/film-list';

export const routes: Routes = [
  { 
    path: '', 
    component: FilmList
 },
 {
   path: '**',
   redirectTo: ''
 }
];
