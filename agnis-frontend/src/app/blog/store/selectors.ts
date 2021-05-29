import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { BlogStateInterface } from '../types/blogState.interface';
import { AppStateInterface } from '../../shared/types/appState.interface';

export const blogFeatureSelector: MemoizedSelector<
  AppStateInterface,
  BlogStateInterface
> = createFeatureSelector<AppStateInterface, BlogStateInterface>('blog');

export const blogValidationErrorsSelector = createSelector(
  blogFeatureSelector,
  (state: BlogStateInterface) => state.validationErrors,
);

export const blogIsSubmittingSelector = createSelector(
  blogFeatureSelector,
  (state: BlogStateInterface) => state.isSubmitting,
);

export const currentUserSelector = createSelector(
  blogFeatureSelector,
  (state: BlogStateInterface) => state.currentUser,
);

export const currentUserBlogsSelector = createSelector(
  blogFeatureSelector,
  (state: BlogStateInterface) => state.currentUserBlogs,
);
