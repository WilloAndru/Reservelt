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
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Guardamos los datos del usuario en memoria para no llamar a cada rato a firebase
  private localUser = new BehaviorSubject<UserModel | null>(null);
  constructor(private auth: Auth) {
    user(this.auth).subscribe((u) => {
      if (u) {
        // Aquí mapeamos los datos del token a nuestro user local
        const mappedUser: UserModel = {
          id: 0,
          uid: u.uid,
          name: u.displayName || '',
          email: u.email || '',
          photoUrl: u.photoURL || '',
          role: 'client',
        };
        this.localUser.next(mappedUser);
      } else {
        this.localUser.next(null);
      }
    });
  }

  // Devuelve el usuario guardado en local
  getLocalUser() {
    return this.localUser.asObservable();
  }

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
