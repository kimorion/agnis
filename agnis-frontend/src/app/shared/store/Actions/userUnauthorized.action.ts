import { createAction } from '@ngrx/store';
import { ActionTypes } from './ActionTypes';

export const userUnauthorizedAction = createAction(
  ActionTypes.UserUnauthorized,
);
