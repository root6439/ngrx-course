import { createReducer, on } from '@ngrx/store';
import { LoginActions } from './action-types';
import { AuthState } from './login-state';

export const initialAuthState: AuthState = {
  user: undefined,
};

export const loginReducer = createReducer(
  initialAuthState,
  on(LoginActions.login, (state, action) => ({ ...state, user: action.user })),
  on(LoginActions.logout, (state) => ({ ...state, user: undefined }))
);
