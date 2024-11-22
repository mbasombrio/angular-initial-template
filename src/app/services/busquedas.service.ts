import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Usuario } from '@models/Hospital/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  transformarUsuarios(resp: any): Usuario[] {
    return resp.map(
      (usuario: any) =>
        new Usuario(
          usuario.nombre,
          usuario.email,
          '',
          '',
          usuario.google,
          usuario.img,
          usuario.uid
        )
    );
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${environment.apiUrl}todo/coleccion/${tipo}/${termino}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.result);
          case 'medicos':
            return resp.result;
          case 'hospitales':
            return resp.result;
        }
      })
    );
  }
}
