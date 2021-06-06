import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import {
  UserFetchFailureAction,
  UserFetchStartAction,
  UserFetchSuccessAction,
} from '../Actions/user.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class userEffect {
  userFetchStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserFetchStartAction),
      switchMap(({ userId }) =>
        this.userService.getUser(userId).pipe(
          map((response: UserDataInterface) => UserFetchSuccessAction({ user: response })),
          catchError((e) => of(UserFetchFailureAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}
}
