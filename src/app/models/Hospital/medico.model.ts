import { environment } from '../../../environments/environment';
import { Hospital } from './hospital.model';
import { Usuario } from './usuario.model';

export class Medico {
  constructor(
    public nombre: string,
    public img?: string,
    public usuario?: Usuario,
    public hospital?: Hospital,
    public uid?: string
  ) {}

  get imageUrl() {
    if (!this.img) {
      `${environment.apiUrl}upload/medicos/no-img.jpg`;
    }

    if (this.img?.includes('https')) {
      return this.img;
    }
    return this.img
      ? `${environment.apiUrl}upload/medicos/${this.img}`
      : `${environment.apiUrl}upload/medicos/no-img.jpg`;
  }
}
