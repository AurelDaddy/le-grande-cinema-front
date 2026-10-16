import { Routes } from '@angular/router';
import { FilmList } from './films/film-list/film-list';
import { FilmDetail } from './films/film-detail/film-detail';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { authGuard } from './core/auth-guard';
import { Reservation } from './reservation/reservation/reservation';

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
    path: 'register',
    component: Register
  },
 {
  path: 'login',
  component: Login
 },
 {
  path: 'reservation/:idSeance',
  component: Reservation,
  canActivate: [authGuard]
  },
 {
   path: '**',
   redirectTo: ''
 }
 
];
