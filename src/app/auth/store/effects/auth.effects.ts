import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthActions } from '../actions/action-types';
import { tap } from 'rxjs/internal/operators/tap';
import { Router } from '@angular/router';

export const userStorageKey = 'user';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(action => {
        localStorage.setItem(userStorageKey, JSON.stringify(action.user));
        this.router.navigateByUrl('/courses');
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem(userStorageKey);
        this.router.navigateByUrl('/login');
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) { }
}
