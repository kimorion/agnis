import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppStateInterface } from '../types/appState.interface';
import { AuthStateInterface } from '../../auth/types/authState.interface';

export const authFeatureSelector: MemoizedSelector<
  AppStateInterface,
  AuthStateInterface
> = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => state.currentUser,
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (state: AuthStateInterface) => state.isLoggedIn,
);
