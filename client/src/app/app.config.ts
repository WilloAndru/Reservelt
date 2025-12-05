import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // Escuchamos errores globales
    provideBrowserGlobalErrorListeners(),

    // Activamos las rutas
    provideRouter(routes),

    // Activamos Firebase para usarla en la app
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Activamos la parte de usuarios
    provideAuth(() => getAuth()),
  ],
};
