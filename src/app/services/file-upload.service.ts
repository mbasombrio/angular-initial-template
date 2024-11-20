import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  apiUrl = environment.apiUrl;
  constructor() {}

  async updatePhoto(
    photo: File,
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    const formData = new FormData();
    formData.append('imagen', photo);

    try {
      const response = await fetch(`${this.apiUrl}upload/${type}/${id}`, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
