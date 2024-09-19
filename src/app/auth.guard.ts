import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.currentLoginStatus) {
    return true;
  } else {
    router.navigate(['/dashboard/login']);
    return false;
  }
};
