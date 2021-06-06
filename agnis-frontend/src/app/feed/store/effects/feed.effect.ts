import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  FeedFetchFailureAction,
  FeedFetchStartAction,
  FeedFetchSuccessAction,
} from '../actions/feed.action';
import { FeedService } from '../../services/feed.service';
import { FeedDataInterface } from '../../types/feedData.interface';

@Injectable()
export class feedEffect {
  feedFetchStart = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedFetchStartAction),
      switchMap(({ skip, take }) =>
        this.feedService.getUserFeed(skip, take).pipe(
          map((response: FeedDataInterface) => FeedFetchSuccessAction({ result: response })),
          catchError((e) => of(FeedFetchFailureAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private feedService: FeedService,
    private router: Router,
  ) {}
}
