import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { PersistenceService } from '../../services/PersistenceService';
import { Router } from '@angular/router';
import { userUnauthorizedAction } from '../Actions/userUnauthorized.action';
import { Injectable } from '@angular/core';

@Injectable()
export class AppEffect {
  unauthorized$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userUnauthorizedAction),
        tap(() => {
          this.router.navigateByUrl('/login');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {}
}
