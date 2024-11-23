import { Component, inject } from '@angular/core';
import { FileUploadService } from '@services/file-upload.service';
import { MessagesService } from '@services/messages.service';
import { ModalImageService } from '@services/modal-image.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-modal-image',
  standalone: true,
  imports: [],
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.scss',
})
export class ModalImageComponent {
  public modalImgageService = inject(ModalImageService);
  fileUploadService = inject(FileUploadService);
  messageService = inject(MessagesService);

  imagenUpload: File | null = null;
  imgTemp: string | null = null;

  cerrarModal() {
    this.imgTemp = null;
    this.modalImgageService.cerrarModal();
  }

  cambiarImagen(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.imgTemp = null;
      return;
    }
    this.imagenUpload = file;

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result as string;
    };
  }

  uploadImage() {
    if (!this.imagenUpload) return;
    this.fileUploadService
      .updatePhoto(
        this.imagenUpload,
        this.modalImgageService.tipo,
        this.modalImgageService.id || ''
      )
      .then((resp) => {
        this.imgTemp = null;
        // Mensaje de éxito opcional
        this.messageService.successMessage(
          'Imagen actualizada',
          'La imagen de perfil ha sido actualizada correctamente.'
        );
        this.modalImgageService.changeImage.set(true);
        this.cerrarModal();
      })
      .catch((err) => {
        console.error(err);
        this.messageService.errorMessage(
          'Error',
          'No se pudo actualizar la imagen.'
        );
      });
  }
}
