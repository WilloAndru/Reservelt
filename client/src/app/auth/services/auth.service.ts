// Permite crear servicios
import { Injectable } from '@angular/core';

// Funciones de Firebase para manejar usuarios
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  user,
} from '@angular/fire/auth';

// Para observar al usuario actual
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Guardamos la conexión con Firebase Auth
  constructor(private auth: Auth) {}

  // Crea un usuario nuevo
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Inicia sesión con correo y contraseña
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Inicia sesión con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Inicia sesión con GitHub
  loginWithGithub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Cierra la sesión actual
  logout() {
    return signOut(this.auth);
  }

  // Devuelve el usuario actual en tiempo real
  getUser(): Observable<any> {
    return user(this.auth);
  }

  // Devuelve el rol del usuario
  getUserRole() {
    return this.getUser().pipe(map((user) => user?.role || null));
  }
}
