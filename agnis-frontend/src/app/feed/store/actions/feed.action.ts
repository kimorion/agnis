import { createAction, props } from '@ngrx/store';
import { FeedDataInterface } from '../../types/feedData.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

export enum FeedActionTypes {
  FeedFetchStart = '[Feed] FeedFetchStart',
  FeedFetchSuccess = '[Feed] FeedFetchSuccess',
  FeedFetchFail = '[Feed] FeedFetchFail',
}

export const FeedFetchStartAction = createAction(
  FeedActionTypes.FeedFetchStart,
  props<{ take: number; skip: number }>(),
);

export const FeedFetchSuccessAction = createAction(
  FeedActionTypes.FeedFetchSuccess,
  props<{ result: FeedDataInterface }>(),
);

export const FeedFetchFailureAction = createAction(
  FeedActionTypes.FeedFetchFail,
  props<{ errors: BackendErrorsInterface }>(),
);
