import { createAction, props } from '@ngrx/store';
import { AuthFormData } from 'src/app/shared/models/authFromData';

export const loginPage = createAction(
  '[Login Component] Login User',
  props<{ fromData: AuthFormData }>()
)

export const registerPage = createAction(
  '[Register Component] Register User',
  props<{ fromData: AuthFormData }>()
)

export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ data: any }>()
)

export const registerSuccess = createAction(
  '[Auth Effect] Register User Success',
  props<{ data: any }>()
)

export const loginFail = createAction(
  '[Auth Effect] Login User Fail',
  props<{ error: any }>()
)

export const registerFail = createAction(
  '[Auth Effect] Register User Fail',
  props<{ error: any }>()
)
