import { BlogStateInterface } from '../types/blogState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  BlogCreateSuccessAction,
  BlogCreateFailAction,
  BlogCreateStartAction,
} from './Actions/blog.action';

const initialState: BlogStateInterface = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  currentUserBlogs: null,
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
);

export function reducers(state: BlogStateInterface, action: Action) {
  return blogReducer(state, action);
}
