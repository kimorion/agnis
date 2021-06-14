import { BlogStateInterface } from '../types/blogState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  BlogCreateFailAction,
  BlogCreateStartAction,
  BlogCreateSuccessAction,
  BlogFetchFailAction,
  BlogFetchStartAction,
  BlogFetchSuccessAction,
  BlogsFetchSuccessAction,
  SubscribeBlogFailAction,
  SubscribeBlogStartAction,
  SubscribeBlogSuccessAction,
  UserBlogsFetchFailAction,
  UserBlogsFetchStartAction,
  UserBlogsFetchSuccessAction,
} from './Actions/blog.action';

const initialState: BlogStateInterface = {
  isSubmitting: false,
  isLoading: false,
  validationErrors: null,
  currentUserBlogs: null,
  activeBlog: null,
  currentBlogs: null,
};

const blogReducer = createReducer(
  initialState,
  on(
    BlogCreateStartAction,
    (state): BlogStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    BlogCreateSuccessAction,
    (state): BlogStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
    }),
  ),
  on(
    BlogCreateFailAction,
    (state, action): BlogStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),
  on(
    UserBlogsFetchStartAction,
    (state): BlogStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    }),
  ),
  on(
    UserBlogsFetchSuccessAction,
    (state, response): BlogStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: null,
      currentUserBlogs: response.blogs,
    }),
  ),
  on(
    UserBlogsFetchFailAction,
    (state, action): BlogStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }),
  ),

  on(
    BlogFetchStartAction,
    (state): BlogStateInterface => ({
      ...state,
      isLoading: true,
      activeBlog: null,
      validationErrors: null,
    }),
  ),
  on(
    BlogFetchSuccessAction,
    (state, response): BlogStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      activeBlog: response.blog,
    }),
  ),
  on(
    BlogFetchFailAction,
    (state, action): BlogStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
      activeBlog: null,
    }),
  ),
  on(
    SubscribeBlogStartAction,
    (state): BlogStateInterface => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    SubscribeBlogSuccessAction,
    (state): BlogStateInterface => ({
      ...state,
      isLoading: false,
    }),
  ),
  on(
    SubscribeBlogFailAction,
    (state, action): BlogStateInterface => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    }),
  ),
  on(
    BlogsFetchSuccessAction,
    (state, action): BlogStateInterface => ({
      ...state,
      isLoading: false,
      currentBlogs: action.blogs,
    }),
  ),
);

export function reducers(state: BlogStateInterface, action: Action) {
  return blogReducer(state, action);
}
