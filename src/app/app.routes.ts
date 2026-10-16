import { Routes } from '@angular/router';
import { FilmList } from './films/film-list/film-list';
import { FilmDetail } from './films/film-detail/film-detail';
import { Register } from './auth/register/register';

export const routes: Routes = [
  {
    path: 'register',
    component: Register
  },
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
