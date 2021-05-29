import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { AuthStateInterface } from '../types/authState.interface';

export const authFeatureSelector: MemoizedSelector<
  AppStateInterface,
  AuthStateInterface
> = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => state.isSubmitting,
);

export const loginValidationErrorsSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => state.loginValidationErrors,
);

export const registerValidationErrorsSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => state.registerValidationErrors,
);
