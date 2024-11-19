import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.validarToken().pipe(
    tap((isAuth) => {
      console.log(isAuth);
      if (!isAuth) {
        router.navigateByUrl('/login');
      }
    })
  );
};
