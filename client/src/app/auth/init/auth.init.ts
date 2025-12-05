// Permite usar el AuthService antes de que arranque la app
import { AuthService } from '../services/auth.service';

export function authInitializer(authService: AuthService) {
  return () =>
    new Promise<void>((resolve) => {
      // Esperamos a que Firebase informe el usuario
      const sub = authService.getUser().subscribe(() => {
        sub.unsubscribe(); // Ya no necesitamos escuchar más aquí
        resolve(); // Terminamos y seguimos con la app
      });
    });
}
