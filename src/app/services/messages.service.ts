import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  successMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: timer,
    });
  }

  errorMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Ok',
      timer: timer,
    });
  }

  warningMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Ok',
      timer: timer,
    });
  }

  infoMessage(title: string, message: string, timer?: number) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Ok',
      timer: timer,
    });
  }

  questionMessage(
    title: string,
    message: string,
    confirmButtonText: string,
    cancelButtonText: string,
    callback: () => void
  ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
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
