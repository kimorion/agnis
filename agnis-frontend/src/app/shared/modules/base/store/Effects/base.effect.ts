import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BaseService } from '../../services/base.service';
import { of } from 'rxjs';
import { PersistenceService } from '../../../../services/PersistenceService';
import { Router } from '@angular/router';
import { baseAction } from '../Actions/base.action';
import { baseErrorAction } from '../Actions/baseError.action';

@Injectable()
export class BaseEffect {
  base$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseAction),
      switchMap(({}) => {
        return this.baseService.doSomething().pipe(
          map((response: Object) => {
            return baseErrorAction;
          }),
          catchError(() => {
            return of(baseErrorAction({}));
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private baseService: BaseService,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {
  }
}
