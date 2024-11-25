import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Usuario } from '@models/Hospital/usuario.model';
import { Hospital } from '@models/Hospital/hospital.model';
import { Medico } from '@models/Hospital/medico.model';

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

  transformarHospitales(resp: any): Hospital[] {
    return resp.map((hospital: any) => ({
      nombre: hospital.nombre,
      img: hospital.img,
      uid: hospital.uid,
    }));
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${environment.apiUrl}todo/coleccion/${tipo}/${termino}`;
    return this.http.get(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.result);
          case 'medicos':
            return this.transformarHospitales(resp.result);
          case 'hospitales':
            return resp.result;
        }
      })
    );
  }

  busquedaGlobal(termino: string) {
    const url = `${environment.apiUrl}todo/${termino}`;
    return this.http.get<{
      ok: boolean;
      hospitales: Hospital[];
      medicos: Medico[];
      usuarios: Usuario[];
    }>(url, this.headers);
  }
}
