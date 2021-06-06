import { createAction, props } from '@ngrx/store';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { UserRequestInterface } from '../../types/userRequest.interface';

export enum ActionTypes {
  LOGOUT = '[Auth] User logout',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register success',
  REGISTER_FAILURE = '[Auth] Register failure',
  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',
}

export const authAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>(),
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ user: UserDataInterface }>(),
);

export const loginFailAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: BackendErrorsInterface }>(),
);

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: UserRequestInterface }>(),
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ user: UserDataInterface }>(),
);

export const registerFailAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: BackendErrorsInterface }>(),
);

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER);

export const getCurrentUserSuccessAction = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ user: UserDataInterface }>(),
);

export const getCurrentUserFailureAction = createAction(ActionTypes.GET_CURRENT_USER_FAILURE);

export const logoutAction = createAction(ActionTypes.LOGOUT);
