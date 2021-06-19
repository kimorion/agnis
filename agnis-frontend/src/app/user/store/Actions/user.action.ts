import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { UpdateUserRequestInterface } from '../../../shared/types/updateUserRequest.interface';

export enum UserActionTypes {
  UserFetchStart = '[User] UserFetchStart',
  UserFetchSuccess = '[User] UserFetchSuccess',
  UserFetchFail = '[User] UserFetchFail',
  UserUpdateStart = '[User] UserUpdateStart',
  UserUpdateSuccess = '[User] UserUpdateSuccess',
  UserUpdateFail = '[User] UserUpdateFail',
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

export const UserUpdateStartAction = createAction(
  UserActionTypes.UserUpdateStart,
  props<{ userId: string; userData: UpdateUserRequestInterface }>(),
);

export const UserUpdateSuccessAction = createAction(
  UserActionTypes.UserUpdateSuccess,
  props<{ userId: string }>(),
);

export const UserUpdateFailureAction = createAction(
  UserActionTypes.UserUpdateFail,
  props<{ errors: BackendErrorsInterface | null }>(),
);
