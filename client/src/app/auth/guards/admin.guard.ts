import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

// Guard para proteger rutas exclusivas del admin
export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUserRole().pipe(
    map((role) => {
      if (role === 'admin') return true; // Si es admin, puede entrar

      router.navigate(['/']); // Si no, lo mandamos al inicio
      return false;
    })
  );
};
