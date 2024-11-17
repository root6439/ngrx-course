import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: User }>()
);

export const logout = createAction('[Menu Bar] Logout');
