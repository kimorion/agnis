import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import {
  UserFetchFailureAction,
  UserFetchStartAction,
  UserFetchSuccessAction,
  UserUpdateFailureAction,
  UserUpdateStartAction,
  UserUpdateSuccessAction,
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

  userUpdateStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserUpdateStartAction),
      switchMap(({ userId, userData }) =>
        this.userService.updateUser(userId, userData).pipe(
          map((response: void) => UserUpdateSuccessAction({ userId: userId })),
          catchError((e) => of(UserUpdateFailureAction({ errors: e.error }))),
        ),
      ),
    ),
  );

  userUpdateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserUpdateSuccessAction),
      switchMap(({ userId }) => of(UserFetchStartAction({ userId: userId }))),
    ),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}
}
