import { Action, createReducer, on } from '@ngrx/store';
import { PostStateInterface } from '../types/postState.interface';
import {
  PostCreateFailure,
  PostCreateStartAction,
  PostCreateSuccess,
  PostFetchFailure,
  PostFetchStartAction,
  PostFetchSuccess,
} from './actions/post.action';
import {
  FeedFetchFailureAction,
  FeedFetchStartAction,
  FeedFetchSuccessAction,
} from './actions/feed.action';

const initialState: PostStateInterface = {
  isLoading: false,
  isSubmitting: false,
  activePost: null,
  feedPosts: null,
  submittingErrors: null,
};

const postReducer = createReducer(
  initialState,
  on(
    PostCreateStartAction,
    (state): PostStateInterface => ({
      ...state,
      isSubmitting: true,
      submittingErrors: null,
    }),
  ),
  on(
    PostCreateSuccess,
    (state, response): PostStateInterface => ({
      ...state,
      isSubmitting: false,
      submittingErrors: null,
      activePost: response.response,
    }),
  ),
  on(
    PostCreateFailure,
    (state, errors): PostStateInterface => ({
      ...state,
      isSubmitting: false,
      submittingErrors: errors.errors,
    }),
  ),
  on(
    PostFetchStartAction,
    (state): PostStateInterface => ({
      ...state,
      isLoading: true,
      activePost: null,
    }),
  ),
  on(
    PostFetchSuccess,
    (state, response): PostStateInterface => ({
      ...state,
      isLoading: false,
      activePost: response.post,
    }),
  ),
  on(
    PostFetchFailure,
    (state, action): PostStateInterface => ({
      ...state,
      isLoading: false,
      activePost: null,
    }),
  ),
  on(
    FeedFetchStartAction,
    (state): PostStateInterface => ({
      ...state,
      isLoading: true,
      feedPosts: null,
    }),
  ),
  on(
    FeedFetchSuccessAction,
    (state, response): PostStateInterface => ({
      ...state,
      isLoading: false,
      feedPosts: response.result,
    }),
  ),
  on(
    FeedFetchFailureAction,
    (state, action): PostStateInterface => ({
      ...state,
      isLoading: false,
      feedPosts: null,
    }),
  ),
);

export function reducers(state: PostStateInterface, action: Action) {
  return postReducer(state, action);
}
