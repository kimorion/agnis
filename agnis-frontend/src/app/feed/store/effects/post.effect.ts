import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import {
  PostCreateFailure,
  PostCreateStartAction,
  PostCreateSuccess,
  PostFetchFailure,
  PostFetchStartAction,
  PostFetchSuccess,
  PostOpenAction,
} from '../actions/post.action';
import { PostDataInterface } from '../../types/postData.interface';
import { BlogFetchStartAction } from '../../../blog/store/Actions/blog.action';
import { environment } from '../../../../environments/environment';

@Injectable()
export class postEffect {
  postCreateStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCreateStartAction),
      switchMap(({ request }) =>
        this.postService.createNewPost(request).pipe(
          map((response: PostDataInterface) => PostCreateSuccess({ response: response })),
          catchError((e) => of(PostCreateFailure({ errors: e.error }))),
        ),
      ),
    ),
  );

  postCreateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCreateSuccess),
      switchMap(({ response }) => of(BlogFetchStartAction({ blogId: response.blog.id }))),
    ),
  );

  postOpen$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostOpenAction),
        tap(({ postId }) => this.router.navigateByUrl(environment.URLS.postPath + `/${postId}`)),
      ),
    { dispatch: false },
  );

  fetchPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostFetchStartAction),
      switchMap(({ postId }) =>
        this.postService.getPost(postId).pipe(
          map((response: PostDataInterface) => PostFetchSuccess({ post: response })),
          catchError((e) => of(PostFetchFailure({ errors: e.error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private postService: PostService,
    private router: Router,
  ) {}
}
