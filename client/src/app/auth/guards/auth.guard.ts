// Permite crear el guard sin usar módulos
import { inject } from '@angular/core';

// Permite mover al usuario a otra página
import { Router } from '@angular/router';

// Servicio donde verificamos si hay usuario
import { AuthService } from '../services/auth.service';

// Para verificar si hay usuario o no
import { map } from 'rxjs/operators';

// Guard para proteger rutas si el usuario no esta logeado
export const authGuard = () => {
  const authService = inject(AuthService); // Acceso al servicio de usuarios
  const router = inject(Router); // Acceso para redirigir

  // Revisamos si hay usuario activo
  return authService.getUser().pipe(
    map((user) => {
      if (user) return true; // Si hay usuario, dejamos pasar

      router.navigate(['/login']); // Si no, lo enviamos al login
      return false;
    })
  );
};
