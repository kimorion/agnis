import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { blogService } from '../../services/blog.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { BlogDataInterface } from '../../types/blogData.interface';
import {
  BlogCreateFailAction,
  BlogCreateStartAction,
  BlogCreateSuccessAction,
  UserBlogsFetchFailAction,
  UserBlogsFetchStartAction,
  UserBlogsFetchSuccessAction,
} from '../Actions/blog.action';
import { BlogDataListInterface } from '../../types/blogDataList.interface';

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

  fetchBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserBlogsFetchStartAction),
      switchMap(({ userId }) =>
        this.blogService.getUserBlogs(userId).pipe(
          map((response: BlogDataListInterface) =>
            UserBlogsFetchSuccessAction({ blogs: response }),
          ),
          catchError((e) => of(UserBlogsFetchFailAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private blogService: blogService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}
}
