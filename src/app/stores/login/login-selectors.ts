import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './login-reducer';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(selectAuthState, (authState) =>
  Boolean(authState.user)
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (isLoggedIn) => !isLoggedIn
);
