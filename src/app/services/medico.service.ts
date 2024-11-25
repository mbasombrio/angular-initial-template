import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Medico } from '@models/Hospital/medico.model';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private http = inject(HttpClient);

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

  constructor() {}

  getMedicos() {
    return this.http
      .get<{ ok: boolean; medicos: Medico[] }>(`${environment.apiUrl}medicos`, {
        ...this.headers,
      })
      .pipe(
        map((resp) => {
          const medicos = resp.medicos.map(
            (medico) =>
              new Medico(
                medico.nombre,
                medico.img,
                medico.usuario,
                medico.hospital,
                medico.uid
              )
          );
          return medicos;
        })
      );
  }

  createMedico(data: { nombre: string }) {
    return this.http.post<{ ok: boolean; medico: Medico }>(
      `${environment.apiUrl}medicos`,
      data,
      {
        ...this.headers,
      }
    );
  }

  updateMedico(data: { nombre: string; uid: string; uidHospital: string }) {
    const body = {
      nombre: data.nombre,
      hospital: data.uidHospital,
    };
    return this.http.put<Medico>(
      `${environment.apiUrl}medicos/${data.uid}`,
      body,
      {
        ...this.headers,
      }
    );
  }

  deleteMedico(uid: string) {
    return this.http.delete<{ ok: boolean; msg: string }>(
      `${environment.apiUrl}medicos/${uid}`,
      {
        ...this.headers,
      }
    );
  }
}
