import { createAction, props } from '@ngrx/store';
import { CreatePostInterface } from '../../types/createPost.interface';
import { PostDataInterface } from '../../types/postData.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

export enum PostActionTypes {
  PostCreateStart = '[Post] PostCreateStart',
  PostCreateSuccess = '[Post] PostCreateSuccess',
  PostCreateFail = '[Post] PostCreateFail',
  PostFetchStart = '[Post] UserPostsFetchStart',
  PostFetchSuccess = '[Post] UserPostsFetchSuccess',
  PostFetchFail = '[Post] UserPostsFetchFail',
  PostOpen = '[Post] PostOpen',
}

export const PostCreateStartAction = createAction(
  PostActionTypes.PostCreateStart,
  props<{ request: CreatePostInterface }>(),
);

export const PostCreateSuccess = createAction(
  PostActionTypes.PostCreateSuccess,
  props<{ response: PostDataInterface }>(),
);

export const PostCreateFailure = createAction(
  PostActionTypes.PostCreateFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const PostFetchStartAction = createAction(
  PostActionTypes.PostFetchStart,
  props<{ postId: string }>(),
);

export const PostFetchSuccess = createAction(
  PostActionTypes.PostFetchSuccess,
  props<{ post: PostDataInterface }>(),
);

export const PostFetchFailure = createAction(
  PostActionTypes.PostFetchFail,
  props<{ errors: BackendErrorsInterface }>(),
);

export const PostOpenAction = createAction(PostActionTypes.PostOpen, props<{ postId: string }>());
