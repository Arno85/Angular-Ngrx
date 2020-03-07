import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { isLoggedIn } from '../store/selectors/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>) { }

  canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn)
      );
  }
}
