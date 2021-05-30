import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { Router } from '@angular/router';
import {
  authAction,
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
  loginFailAction,
  loginSuccessAction,
  registerAction,
  registerFailAction,
  registerSuccessAction,
} from '../Actions/auth.action';

@Injectable()
export class AuthEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((userResponse: UserDataInterface) => {
            this.persistenceService.set(PersistenceService.USER_ID_KEY, userResponse.id);
            return registerSuccessAction({ user: userResponse });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailAction({ errors: errorResponse.error }));
          }),
        );
      }),
    ),
  );

  redirectAfterRegistration$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction, loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((userResponse: UserDataInterface) => {
            this.persistenceService.set(PersistenceService.USER_ID_KEY, userResponse.id);
            return loginSuccessAction({ user: userResponse });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailAction({ errors: errorResponse.error }));
          }),
        );
      }),
    ),
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((userResponse: UserDataInterface) => {
            return getCurrentUserSuccessAction({ user: userResponse });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}
}
