import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  get confirmStyles() {
    return {
      customClass: {
        confirmButton: 'btn btn-info',
      },
      buttonsStyling: false,
    };
  }

  successMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: timer,
      ...this.confirmStyles,
    });
  }

  errorMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok',
      timer: timer,
      ...this.confirmStyles,
    });
  }

  warningMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Ok',
      timer: timer,
      ...this.confirmStyles,
    });
  }

  infoMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Ok',
      timer: timer,
      ...this.confirmStyles,
    });
  }
  questionMessage(
    title: string,
    message: string,
    callback: () => void,
    confirmButtonText: string = 'Confirmar',
    cancelButtonText: string = 'Cancelar'
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2', // Clase Bootstrap para margen horizontal
        cancelButton: 'btn btn-danger mx-2', // Clase Bootstrap para margen horizontal
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
  }
}
