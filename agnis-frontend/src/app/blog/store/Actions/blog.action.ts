import { createAction, props } from '@ngrx/store';
import { CreateBlogRequestInterface } from '../../types/createBlogRequest.interface';
import { BlogDataInterface } from '../../types/blogData.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { BlogDataListInterface } from '../../types/blogDataList.interface';

export enum BlogActionTypes {
  BlogCreateStart = '[Blog] BlogCreateStart',
  BlogCreateSuccess = '[Blog] BlogCreateSuccess',
  BlogCreateFail = '[Blog] BlogCreateFail',
  UserBlogsFetchStart = '[Blog] UserBlogsFetchStart',
  UserBlogsFetchSuccess = '[Blog] UserBlogsFetchSuccess',
  UserBlogsFetchFail = '[Blog] UserBlogsFetchFail',
}

export const BlogCreateStartAction = createAction(
  BlogActionTypes.BlogCreateStart,
  props<{ request: CreateBlogRequestInterface }>(),
);

export const BlogCreateSuccessAction = createAction(
  BlogActionTypes.BlogCreateSuccess,
  props<{ blog: BlogDataInterface }>(),
);

export const BlogCreateFailAction = createAction(
  BlogActionTypes.BlogCreateFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const UserBlogsFetchStartAction = createAction(
  BlogActionTypes.UserBlogsFetchStart,
  props<{ userId: string }>(),
);

export const UserBlogsFetchSuccessAction = createAction(
  BlogActionTypes.UserBlogsFetchSuccess,
  props<{ blogs: BlogDataListInterface }>(),
);

export const UserBlogsFetchFailAction = createAction(
  BlogActionTypes.UserBlogsFetchFail,
  props<{ errors: BackendErrorsInterface }>(),
);
