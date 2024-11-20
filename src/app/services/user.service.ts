import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginForm } from '@interfaces/login-form.interface';
import { renewTokenInterface } from '@interfaces/renew-token.interface';
import { ResponseCreateUser } from '@interfaces/response-create-user.interface';
import { Usuario } from '@models/Hospital/usuario.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);

  userLogged = signal<Usuario>(new Usuario('', '', '', '', false, '', ''));
  user = computed(() => this.userLogged());

  constructor() {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    const user = this.userLogged();
    return user && user.uid ? user.uid : '';
  }

  get isGoogleUser(): boolean {
    const googleEmail = localStorage.getItem('googleEmail');
    return googleEmail ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    const googleEmail = localStorage.getItem('googleEmail');
    if (googleEmail) {
      google.accounts.id.revoke(googleEmail, () => {
        localStorage.removeItem('googleEmail');
        this.router.navigateByUrl('/login');
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  validarToken(): Observable<boolean> {
    const token = this.token;
    // hacer .map y que devuelva el booleano

    return this.http
      .get<renewTokenInterface>(`${environment.apiUrl}login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        map((resp) => {
          const { nombre, email, role, google, img = '', uid } = resp.user;
          this.userLogged.set(
            new Usuario(nombre, email, role, '', google, img, uid)
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  createUser(user: Usuario) {
    return this.http
      .post<ResponseCreateUser>(`${environment.apiUrl}usuarios`, user)
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formData: LoginForm) {
    return this.http
      .post<{ ok: boolean; token: string }>(
        `${environment.apiUrl}login`,
        formData
      )
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http
      .post<{ ok: boolean; email: String; token: string }>(
        `${environment.apiUrl}login/google`,
        { token }
      )
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    // Obtener el valor actual de la señal
    const user: Usuario = this.userLogged();

    // Comprobar que 'user' es un objeto de tipo 'Usuario' y tiene las propiedades necesarias
    if (user && user.role !== undefined) {
      data = {
        ...data,
        role: user.role, // Asignamos el role desde el objeto 'user'
      };
    }

    return this.http.put<{ ok: string; usuario: Usuario; msg: string }>(
      `${environment.apiUrl}usuarios/${this.uid}`,
      data,
      {
        headers: {
          'x-token': this.token,
        },
      }
    );
  }
}
