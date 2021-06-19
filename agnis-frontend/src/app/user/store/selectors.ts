import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { UserStateInterface } from '../types/userState.interface';

export const userFeatureSelector: MemoizedSelector<
  AppStateInterface,
  UserStateInterface
> = createFeatureSelector<AppStateInterface, UserStateInterface>('user');

export const selectedUserSelector = createSelector(
  userFeatureSelector,
  (state: UserStateInterface) => state.selectedUser,
);

export const validationErrorsSelector = createSelector(
  userFeatureSelector,
  (state: UserStateInterface) => state.validationErrors,
);
