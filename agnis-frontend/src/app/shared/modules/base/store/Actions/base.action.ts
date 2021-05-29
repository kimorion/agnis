import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypes';

export const baseAction = createAction(ActionTypes.Base, props<Object>());
