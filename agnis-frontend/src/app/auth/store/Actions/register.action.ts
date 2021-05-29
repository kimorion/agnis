import { createAction, props } from '@ngrx/store';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { UserRequestInterface } from '../../types/userRequest.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

export enum ActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register success',
  REGISTER_FAILURE = '[Auth] Register failure',
}

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
