import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import { LoginActions } from './action-types';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const loginReducer = createReducer(
  initialAuthState,
  on(LoginActions.login, (state, action) => ({ ...state, user: action.user })),
  on(LoginActions.logout, (state) => ({ ...state, user: undefined }))
);
