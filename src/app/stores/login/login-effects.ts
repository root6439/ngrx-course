import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginActions } from './action-types';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export const loginEffect = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(LoginActions.login),
      tap((data) => localStorage.setItem('user', JSON.stringify(data.user)))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const logoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(LoginActions.logout),
      tap((_) => {
        localStorage.removeItem('user');
        router.navigateByUrl('/login');
      })
    );
  },
  { functional: true, dispatch: false }
);
