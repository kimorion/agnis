import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';

export const baseErrorAction = createAction(ActionTypes.Base, props<Object>());
