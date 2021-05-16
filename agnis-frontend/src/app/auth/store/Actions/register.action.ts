import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UserDataInterface } from '../../../shared/types/userDataInterface';
import { UserRequestInterface } from '../../types/userRequest.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

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
