import { AuthStateInterface } from '../types/authState.interface';
import { Action, createReducer, on } from '@ngrx/store';

import {
  authAction,
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
  loginFailAction,
  loginSuccessAction,
  logoutAction,
  registerAction,
  registerFailAction,
  registerSuccessAction,
} from './Actions/auth.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  loginValidationErrors: null,
  registerValidationErrors: null,
  isLoading: false,
  isLoggedIn: false,
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
      currentUser: action.user,
      isLoggedIn: true,
    }),
  ),
  on(
    registerFailAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      registerValidationErrors: action.errors,
    }),
  ),
  on(
    authAction,
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
      isLoggedIn: true,
      currentUser: action.user,
    }),
  ),
  on(
    loginFailAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      loginValidationErrors: action.errors,
    }),
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.user,
    }),
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    }),
  ),
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
    }),
  ),
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
