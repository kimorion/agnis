import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { UserDataInterface } from '../../../shared/types/userData.interface';

export enum UserActionTypes {
  UserFetchStart = '[User] UserFetchStart',
  UserFetchSuccess = '[User] UserFetchSuccess',
  UserFetchFail = '[User] UserFetchFail',
  UserUsersFetchStart = '[User] UserUsersFetchStart',
  UserUsersFetchSuccess = '[User] UserUsersFetchSuccess',
  UserUsersFetchFail = '[User] UserUsersFetchFail',
  OpenUser = '[User] OpenUser',
}

export const UserFetchStartAction = createAction(
  UserActionTypes.UserFetchStart,
  props<{ userId: string }>(),
);

export const UserFetchSuccessAction = createAction(
  UserActionTypes.UserFetchSuccess,
  props<{ user: UserDataInterface }>(),
);

export const UserFetchFailureAction = createAction(
  UserActionTypes.UserFetchFail,
  props<{ errors: BackendErrorsInterface }>(),
);
