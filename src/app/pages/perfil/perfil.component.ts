import { Component, inject } from '@angular/core';
import { UserService } from '@services/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { MessagesService } from '@services/messages.service';
import { Usuario } from '@models/Hospital/usuario.model';
import { FileUploadService } from '@services/file-upload.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  userService = inject(UserService);
  messageService = inject(MessagesService);
  fileUploadService = inject(FileUploadService);

  formSubmitted = false;
  usuario: Usuario = this.userService.userLogged();
  imagenUpload: File | null = null;
  imgTemp: string | null = null;

  profileForm = new FormGroup({
    email: new FormControl(
      {
        value: this.usuario.email || '',
        disabled: this.userService.isGoogleUser,
      },
      [Validators.required, Validators.email]
    ),
    nombre: new FormControl(this.usuario.nombre || '', Validators.required),
    role: new FormControl(this.usuario.role || '', Validators.required),
  });

  onSubmit() {
    this.formSubmitted = true;
    if (this.profileForm.invalid) return;

    const user = this.userService.userLogged();
    const userToSave = new Usuario(
      this.profileForm.controls.nombre.value || '',
      this.profileForm.value.email || '',
      user.role,
      user.password,
      user.google,
      user.img,
      user.uid
    );
    this.userService.actualizar(userToSave).subscribe({
      next: (resp) => {
        console.log(resp.usuario);
        this.userService.userLogged.set(
          new Usuario(
            resp.usuario.nombre,
            resp.usuario.email,
            resp.usuario.role,
            '', // Password no es relevante aquí
            resp.usuario.google,
            resp.usuario.img,
            resp.usuario.uid
          )
        );
        this.messageService.successMessage(
          'Perfil actualizado',
          'Perfil actualizado correctamente'
        );
      },
      error: (err) => {
        this.messageService.errorMessage('Error', err.error.msg);
      },
    });
  }

  campoNoValido(campo: string): boolean | undefined {
    return this.profileForm.get(campo)?.invalid && this.formSubmitted;
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
      console.log(reader.result);
    };
  }

  uploadImage() {
    if (!this.imagenUpload) return;
    this.fileUploadService
      .updatePhoto(this.imagenUpload, 'usuarios', this.usuario.uid || '')
      .then((resp) => {
        this.imgTemp = null;
        console.log(resp.fileName);
        this.usuario.img = resp.fileName;

        this.userService.userLogged.set(
          new Usuario(
            this.usuario.nombre,
            this.usuario.email,
            this.usuario.role,
            '', // Password no es relevante aquí
            this.usuario.google,
            this.usuario.img,
            this.usuario.uid
          )
        );
        // Mensaje de éxito opcional
        this.messageService.successMessage(
          'Imagen actualizada',
          'La imagen de perfil ha sido actualizada correctamente.'
        );
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
