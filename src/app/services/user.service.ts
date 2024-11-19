import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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
  user: Usuario | undefined;

  constructor() {}

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
    const token = localStorage.getItem('token') || '';
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
          this.user = new Usuario(nombre, email, role, '', google, img, uid);
          localStorage.setItem('token', resp.token);
          return true
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
}
