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

  profileForm = new FormGroup({
    email: new FormControl(this.usuario.email || '', [
      Validators.required,
      Validators.email,
    ]),
    nombre: new FormControl(this.usuario.nombre || '', Validators.required),
    role: new FormControl(this.usuario.role || '', Validators.required),
  });

  onSubmit() {
    this.formSubmitted = true;
    if (this.profileForm.invalid) return;

    this.userService
      .actualizarPerfil(
        this.profileForm.value as {
          email: string;
          nombre: string;
          role: string;
        }
      )
      .subscribe({
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

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.imagenUpload = file;
    this.fileUploadService
      .updatePhoto(file, 'usuarios', this.usuario.uid || '')
      .then((resp) => {
        this.userService.userLogged.set(
          new Usuario(
            this.usuario.nombre,
            this.usuario.email,
            this.usuario.role,
            '', // Password no es relevante aquí
            this.usuario.google,
            resp.fileName,
            this.usuario.uid
          )
        );
      });
  }
}
