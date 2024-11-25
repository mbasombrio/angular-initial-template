import { environment } from '../../../environments/environment';
import { Usuario } from './usuario.model';

export class Hospital {
  constructor(
    public nombre: string,
    public usuario: Usuario,
    public img?: string,
    public uid?: string,
    public _id?: string
  ) {}

  get imageUrl() {
    if (!this.img) {
      `${environment.apiUrl}upload/hospitales/no-img.jpg`;
    }

    if (this.img?.includes('https')) {
      return this.img;
    }
    return this.img
      ? `${environment.apiUrl}upload/hospitales/${this.img}`
      : `${environment.apiUrl}upload/hospitales/no-img.jpg`;
  }
}
