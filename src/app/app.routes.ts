import { Routes } from '@angular/router';
import { FilmList } from './films/film-list/film-list';
import { FilmDetail } from './films/film-detail/film-detail';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { authGuard } from './core/auth-guard';
import { Reservation } from './reservation/reservation/reservation';
import { Paiement } from './payment/paiement/paiement';
import { BilletList } from './billet/billet-list/billet-list';
import { BilletDetail } from './billet/billet-detail/billet-detail';
import { adminGuard } from './core/admin-guard';
import { AdminFilmForm } from './admin/admin-film-form/admin-film-form';
import { AdminSeanceForm } from './admin/admin-seance-form/admin-seance-form';
import { AdminSeanceList } from './admin/admin-seance-list/admin-seance-list';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { AdminReservationList } from './admin/admin-reservation-list/admin-reservation-list';
import { AdminFrequentation } from './admin/admin-frequentation/admin-frequentation';

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
    path: 'paiement/:idReservation',
    component: Paiement,
    canActivate: [authGuard]
  },
  {
    path: 'billets',
    component: BilletList,
    canActivate: [authGuard]
  },
  {
    path: 'billet/:idReservation',
    component: BilletDetail,
    canActivate: [authGuard]
  },
  {
  path: 'admin',
  component: AdminDashboard,
  canActivate: [adminGuard]
},
{
  path: 'admin/seances',
  component: AdminSeanceList,
  canActivate: [adminGuard]
},
{
  path: 'admin/seances/new',
  component: AdminSeanceForm,
  canActivate: [adminGuard]
},
{
  path: 'admin/films/new',
  component: AdminFilmForm,
  canActivate: [adminGuard]
},
{
  path: 'admin/seances/:idSeance/reservations',
  component: AdminReservationList,
  canActivate: [adminGuard]
},
{
  path: 'admin/frequentation',
  component: AdminFrequentation,
  canActivate: [adminGuard]
},
{
  path: '**',
  redirectTo: ''
}

];
