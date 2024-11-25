import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen',
  standalone: true,
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      `${environment.apiUrl}upload/${tipo}/no-img.jpg`;
    }

    if (img?.includes('https')) {
      return img;
    }
    return img
      ? `${environment.apiUrl}upload/${tipo}/${img}`
      : `${environment.apiUrl}upload/${tipo}/no-img.jpg`;
  }
}
