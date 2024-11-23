import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _ocultarModal: boolean = true;
  id: string = '';
  tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  currentImg?: string;

  changeImage = signal<boolean>(false);

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  abrirModal(
    id: string,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    currentImg?: string
  ) {
    this._ocultarModal = false;
    this.id = id;
    this.tipo = tipo;
    if (!currentImg) {
      this.currentImg = `${environment.apiUrl}upload/${this.tipo}/no-img.jpg`;
    } else if (this.currentImg?.includes('https')) {
      this.currentImg = currentImg;
    } else {
      this.currentImg = `${environment.apiUrl}upload/${this.tipo}/${currentImg}`;
    }

    console.log(this.currentImg);
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() {}
}
