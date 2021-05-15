import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { UserResponseInterface } from '../../../shared/types/userResponseInterface';
import { UserRequestInterface } from '../../types/userRequest.interface';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: UserRequestInterface }>(),
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ user: UserResponseInterface }>(),
);

export const registerFailAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ error: string }>(),
);
