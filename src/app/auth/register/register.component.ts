import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessagesService } from '@services/messages.service';
import { UserService } from '@services/user.service';

import { passwordsMatchValidator } from 'src/app/validators/passwords-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  formSubmitted = false;
  private userService = inject(UserService);
  private massageService = inject(MessagesService);

  registerForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      terminos: new FormControl(false, Validators.requiredTrue),
    },
    {
      validators: passwordsMatchValidator,
    }
  );

  crearUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (resp) => {
        this.massageService.successMessage(
          'Usuario creado',
          'Usuario creado correctamente'
        );
      },
      error: (err) => {
        this.massageService.errorMessage('Error', err.error.msg);
      },
    });
  }

  campoNoValido(campo: string): boolean | undefined {
    return this.registerForm.get(campo)?.invalid && this.formSubmitted;
  }
}
