import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UserDataInterface } from '../../../shared/types/userDataInterface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

export const loginAction = createAction(
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
