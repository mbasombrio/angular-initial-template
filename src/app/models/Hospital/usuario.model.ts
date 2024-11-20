import { environment } from '../../../environments/environment';

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public role?: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public uid?: string
  ) {}

  get imageUrl() {
    if (this.img?.includes('https')) {
      return this.img;
    }
    return this.img
      ? `${environment.apiUrl}upload/usuarios/${this.img}`
      : `${environment.apiUrl}upload/usuarios/no-img.jpg`;
  }
}
