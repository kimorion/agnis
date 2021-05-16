import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  registerAction,
  registerFailAction,
  registerSuccessAction,
} from '../Actions/register.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserDataInterface } from '../../../shared/types/userDataInterface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { Router } from '@angular/router';
import { loginAction, loginSuccessAction } from '../Actions/login.action';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((userResponse: UserDataInterface) => {
            this.persistenceService.set('currentUserId', userResponse.id);
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
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((userResponse: UserDataInterface) => {
            this.persistenceService.set('currentUserId', userResponse.id);
            return loginSuccessAction({ user: userResponse });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailAction({ errors: errorResponse.error }));
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
