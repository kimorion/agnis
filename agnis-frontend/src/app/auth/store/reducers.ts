import { AuthStateInterface } from '../types/authState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  registerAction,
  registerFailAction,
  registerSuccessAction,
} from './Actions/register.action';
import { loginAction, loginFailAction, loginSuccessAction } from './Actions/login.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  loginValidationErrors: null,
  registerValidationErrors: null,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      loginValidationErrors: null,
    }),
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user
    }),
  ),
  on(
    registerFailAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      registerValidationErrors: action.errors
    }),
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      loginValidationErrors: null,
    }),
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.user
    }),
  ),
  on(
    loginFailAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      loginValidationErrors: action.errors
    }),
  ),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
