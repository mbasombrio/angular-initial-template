import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hospital } from '@models/Hospital/hospital.model';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
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

  getHospitales() {
    return this.http
      .get<{ ok: boolean; hospitales: Hospital[] }>(
        `${environment.apiUrl}hospitales`,
        {
          ...this.headers,
        }
      )
      .pipe(
        map((resp) => {
          const hospitales = resp.hospitales.map(
            (hospital) =>
              new Hospital(
                hospital.nombre,
                hospital.usuario,
                hospital.img,
                hospital.uid
              )
          );
          return hospitales;
        })
      );
  }

  createHospital(data: { nombre: string }) {
    return this.http.post<{ ok: boolean; hospital: Hospital }>(
      `${environment.apiUrl}hospitales`,
      data,
      {
        ...this.headers,
      }
    );
  }

  updateHospital(data: { nombre: string; uid: string }) {
    return this.http.put<Hospital>(
      `${environment.apiUrl}hospitales/${data.uid}`,
      data,
      {
        ...this.headers,
      }
    );
  }

  deleteHospital(uid: string) {
    return this.http.delete<{ ok: boolean; msg: string }>(
      `${environment.apiUrl}hospitales/${uid}`,
      {
        ...this.headers,
      }
    );
  }
}
