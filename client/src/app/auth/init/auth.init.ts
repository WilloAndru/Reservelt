import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function authInitializer(): Promise<void> {
  const authService = inject(AuthService);

  return new Promise<void>((resolve) => {
    // Usamos el metodo getUser para obetner los datos del usuario una unica vez
    const sub = authService.getUser().subscribe(() => {
      sub.unsubscribe(); // Deja de escuchar cambios
      resolve(); // Termina la inicialización
    });
  });
}
