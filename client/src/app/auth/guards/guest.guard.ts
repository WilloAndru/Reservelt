import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

// Guard para proteger rutas si el usuario esta logeado
export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    map((user) => {
      if (!user) return true; // Si NO está logueado, puede entrar

      // Si ya está logueado, lo mandamos al inicio
      router.navigate(['/']);
      return false;
    })
  );
};
