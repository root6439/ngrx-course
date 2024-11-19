import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { isLoggedIn } from '../stores/login/login-selectors';

export const coursesGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(isLoggedIn).pipe(
    tap((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigateByUrl('/login');
      }
    })
  );
};
