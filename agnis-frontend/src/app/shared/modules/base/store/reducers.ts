import { ModuleStateInterface } from '../types/moduleState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { baseAction } from './Actions/base.action';

const initialState: ModuleStateInterface = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
};

const baseReducer = createReducer(
  initialState,
  on(
    baseAction,
    (state): ModuleStateInterface => ({
      ...state,
    }),
  ),
);

export function reducers(state: ModuleStateInterface, action: Action) {
  return baseReducer(state, action);
}
