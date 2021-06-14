import { createAction, props } from '@ngrx/store';
import { CreateBlogRequestInterface } from '../../types/createBlogRequest.interface';
import { BlogDataInterface } from '../../types/blogData.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { SubscriptionResponseInterface } from '../../types/subscriptionResponse.interface';

export enum BlogActionTypes {
  BlogCreateStart = '[Blog] BlogCreateStart',
  BlogCreateSuccess = '[Blog] BlogCreateSuccess',
  BlogCreateFail = '[Blog] BlogCreateFail',
  BlogFetchStart = '[Blog] BlogFetchStart',
  BlogFetchSuccess = '[Blog] BlogFetchSuccess',
  BlogFetchFail = '[Blog] BlogFetchFail',
  UserBlogsFetchStart = '[Blog] UserBlogsFetchStart',
  UserBlogsFetchSuccess = '[Blog] UserBlogsFetchSuccess',
  UserBlogsFetchFail = '[Blog] UserBlogsFetchFail',
  BlogsFetchStart = '[Blog] BlogsFetchStart',
  BlogsFetchSuccess = '[Blog] BlogsFetchSuccess',
  BlogsFetchFail = '[Blog] BlogsFetchFail',
  OpenBlog = '[Blog] OpenBlog',
  SubscribeBlogStart = '[Blog] SubscribeBlogStart',
  SubscribeBlogSuccess = '[Blog] SubscribeBlogSuccess',
  SubscribeBlogFail = '[Blog] SubscribeBlogFail',
  UnsubscribeBlogStart = '[Blog] UnsubscribeBlogStart',
  UnsubscribeBlogSuccess = '[Blog] UnsubscribeBlogSuccess',
  UnsubscribeBlogFail = '[Blog] UnsubscribeBlogFail',
  BlogsPageChange = '[Blog] BlogsPageChange',
  UserBlogsPageChange = '[Blog] UserBlogsPageChange',
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

export const BlogFetchStartAction = createAction(
  BlogActionTypes.BlogFetchStart,
  props<{ blogId: string }>(),
);

export const BlogFetchSuccessAction = createAction(
  BlogActionTypes.BlogFetchSuccess,
  props<{ blog: BlogDataInterface }>(),
);

export const BlogFetchFailAction = createAction(
  BlogActionTypes.BlogFetchFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const UserBlogsFetchStartAction = createAction(BlogActionTypes.UserBlogsFetchStart);

export const UserBlogsFetchSuccessAction = createAction(
  BlogActionTypes.UserBlogsFetchSuccess,
  props<{ blogs: BlogDataListInterface }>(),
);

export const UserBlogsFetchFailAction = createAction(
  BlogActionTypes.UserBlogsFetchFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const OpenBlogAction = createAction(BlogActionTypes.OpenBlog, props<{ blogId: string }>());

export const SubscribeBlogStartAction = createAction(
  BlogActionTypes.SubscribeBlogStart,
  props<{ blogId: string }>(),
);
export const SubscribeBlogSuccessAction = createAction(
  BlogActionTypes.SubscribeBlogSuccess,
  props<{ blogId: string }>(),
);
export const SubscribeBlogFailAction = createAction(
  BlogActionTypes.SubscribeBlogFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const UnsubscribeBlogStartAction = createAction(
  BlogActionTypes.UnsubscribeBlogStart,
  props<{ blogId: string }>(),
);
export const UnsubscribeBlogSuccessAction = createAction(
  BlogActionTypes.UnsubscribeBlogSuccess,
  props<{ blogId: string }>(),
);
export const UnsubscribeBlogFailAction = createAction(
  BlogActionTypes.UnsubscribeBlogFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const BlogsFetchStartAction = createAction(
  BlogActionTypes.BlogsFetchStart,
  (name: string = '') => ({ name }),
);

export const BlogsFetchSuccessAction = createAction(
  BlogActionTypes.BlogsFetchSuccess,
  props<{ blogs: BlogDataListInterface }>(),
);

export const BlogsFetchFailAction = createAction(
  BlogActionTypes.BlogsFetchFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const BlogsPageChangeAction = createAction(
  BlogActionTypes.BlogsPageChange,
  props<{ skip: number; take: number }>(),
);
export const UserBlogsPageChangeAction = createAction(
  BlogActionTypes.UserBlogsPageChange,
  props<{ skip: number; take: number }>(),
);
