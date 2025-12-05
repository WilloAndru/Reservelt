import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { adminGuard } from './auth/guards/admin.guard';
import { guestGuard } from './auth/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./auth/pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'reservation',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/reservation/reservation.component').then((m) => m.ReservationComponent),
  },
  {
    path: 'my-reservations',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/my-reservations/my-reservations.component').then(
        (m) => m.MyReservationsComponent
      ),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.ProfileComponent),
  },
];
