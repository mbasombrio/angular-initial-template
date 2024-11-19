import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('password2')?.value;

  return password === confirmPassword ? null : { passwordsMismatch: true };
}
