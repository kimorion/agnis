import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { PostStateInterface } from '../types/postState.interface';

export const postFeatureSelector: MemoizedSelector<
  AppStateInterface,
  PostStateInterface
> = createFeatureSelector<AppStateInterface, PostStateInterface>('post');

export const feedPostsSelector = createSelector(
  postFeatureSelector,
  (state: PostStateInterface) => state.feedPosts,
);

export const isFeedLoadingSelector = createSelector(
  postFeatureSelector,
  (state: PostStateInterface) => state.isLoading,
);

export const isPostSubmittingSelector = createSelector(
  postFeatureSelector,
  (state: PostStateInterface) => state.isSubmitting,
);

export const postSubmittingErrorsSelector = createSelector(
  postFeatureSelector,
  (state: PostStateInterface) => state.submittingErrors,
);

export const activePostSelector = createSelector(
  postFeatureSelector,
  (state: PostStateInterface) => state.activePost,
);
