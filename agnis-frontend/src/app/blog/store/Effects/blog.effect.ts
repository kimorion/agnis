import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { blogService } from '../../services/blog.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { BlogDataInterface } from '../../types/blogData.interface';
import {
  BlogCreateFailAction,
  BlogCreateStartAction,
  BlogCreateSuccessAction,
  BlogFetchFailAction,
  BlogFetchStartAction,
  BlogFetchSuccessAction,
  BlogsFetchFailAction,
  BlogsFetchStartAction,
  BlogsFetchSuccessAction,
  BlogsPageChangeAction,
  OpenBlogAction,
  SubscribeBlogFailAction,
  SubscribeBlogStartAction,
  SubscribeBlogSuccessAction,
  UnsubscribeBlogFailAction,
  UnsubscribeBlogStartAction,
  UnsubscribeBlogSuccessAction,
  UserBlogsFetchFailAction,
  UserBlogsFetchStartAction,
  UserBlogsFetchSuccessAction,
  UserBlogsPageChangeAction,
} from '../Actions/blog.action';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { environment } from '../../../../environments/environment';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { Store } from '@ngrx/store';
import { SubscriptionResponseInterface } from '../../types/subscriptionResponse.interface';

@Injectable()
export class blogEffect {
  blogCreateStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogCreateStartAction),
      switchMap(({ request }) =>
        this.blogService.createBlog(request).pipe(
          map((response: BlogDataInterface) => BlogCreateSuccessAction({ blog: response })),
          catchError((e) => of(BlogCreateFailAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  blogCreateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BlogCreateSuccessAction),
        tap(({ blog }) => {
          window.location.reload();
        }),
      ),
    { dispatch: false },
  );

  fetchUserBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserBlogsFetchStartAction),
      switchMap(() =>
        this.blogService.getUserBlogs().pipe(
          map((response: BlogDataListInterface) =>
            UserBlogsFetchSuccessAction({ blogs: response }),
          ),
          catchError((e) => of(UserBlogsFetchFailAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  fetchBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogsFetchStartAction),
      switchMap(() =>
        this.blogService.getBlogs().pipe(
          map((response: BlogDataListInterface) => BlogsFetchSuccessAction({ blogs: response })),
          catchError((e) => of(BlogsFetchFailAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  openBlog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OpenBlogAction),
        tap(({ blogId }) => {
          this.router.navigateByUrl(`blogs/${blogId}`);
        }),
      ),
    { dispatch: false },
  );

  subscribeBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscribeBlogStartAction),
      switchMap(({ blogId }) =>
        this.blogService.subscribeToBlog(blogId).pipe(
          map((response: SubscriptionResponseInterface) =>
            SubscribeBlogSuccessAction({ blogId: blogId }),
          ),
          catchError((e) => of(SubscribeBlogFailAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  unsubscribeBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnsubscribeBlogStartAction),
      switchMap(({ blogId }) =>
        this.blogService.unsubscribeToBlog(blogId).pipe(
          map((response: SubscriptionResponseInterface) =>
            UnsubscribeBlogSuccessAction({ blogId: blogId }),
          ),
          catchError((e) => of(UnsubscribeBlogFailAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  fetchBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogFetchStartAction),
      switchMap(({ blogId }) =>
        this.blogService.getBlog(blogId).pipe(
          map((response: BlogDataInterface) => BlogFetchSuccessAction({ blog: response })),
          catchError((e) => of(BlogFetchFailAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  blogSubscribeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscribeBlogSuccessAction),
      switchMap(({ blogId }) => {
        return of(BlogFetchStartAction({ blogId: blogId }), BlogsFetchStartAction());
      }),
    ),
  );

  blogUnsubscribeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnsubscribeBlogSuccessAction),
      switchMap(({ blogId }) => {
        return of(BlogFetchStartAction({ blogId: blogId }), BlogsFetchStartAction());
      }),
    ),
  );

  blogsPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogsPageChangeAction),
      map(({ skip, take }) => {
        this.router.navigate([], {
          queryParams: { skip: skip, take: take },
          queryParamsHandling: 'merge',
        });
        return BlogsFetchStartAction();
      }),
    ),
  );

  userBlogsPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserBlogsPageChangeAction),
      map(({ skip, take }) => {
        this.router.navigate([], {
          queryParams: { skip: skip, take: take },
          queryParamsHandling: 'merge',
        });
        return UserBlogsFetchStartAction();
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private blogService: blogService,
    private persistenceService: PersistenceService,
    private router: Router,
    private store: Store<AppStateInterface>,
  ) {}
}
