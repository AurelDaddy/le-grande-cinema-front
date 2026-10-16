import { Routes } from '@angular/router';
import { FilmList } from './films/film-list/film-list';
import { FilmDetail } from './films/film-detail/film-detail';

export const routes: Routes = [
  { 
    path: '', 
    component: FilmList
 },
 {
   path: 'films/:id',
   component: FilmDetail
 },
 {
   path: '**',
   redirectTo: ''
 }
 
];
