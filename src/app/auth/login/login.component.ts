import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessagesService } from '@services/messages.service';
import { UserService } from '@services/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  private router = inject(Router);
  private userService = inject(UserService);
  private messagesService = inject(MessagesService);

  formSubmitted = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email') || '', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false),
  });

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '669071667721-gebiefadda81j4cfr32qkpj82ena3cg2.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });
    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      theme: 'outline',
      size: 'large',
    });
  }

  handleCredentialResponse(response: any) {
    if (response.credential) {
      this.loginGoogle(response.credential);
    }
  }

  loginGoogle(token: string) {
    this.userService.loginGoogle(token).subscribe({
      next: (resp) => {
        localStorage.setItem('googleEmail', `${resp.email}`);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messagesService.errorMessage('Error', err.error.msg);
      },
    });
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) return;
    this.userService.login(this.loginForm.value).subscribe({
      next: () => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messagesService.errorMessage('Error', err.error.msg);
      },
    });
  }

  campoNoValido(campo: string): boolean | undefined {
    return this.loginForm.get(campo)?.invalid && this.formSubmitted;
  }
}
