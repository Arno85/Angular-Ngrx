import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { CoursesActions } from '../store/courses.actions';
import { areCoursesLoaded } from '../store/courses.selectors';

@Injectable()
export class CoursesResolver implements Resolve<any>{

  loading = false;

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areCoursesLoaded),
        tap(coursesLoaded => {
          if (!this.loading && !coursesLoaded) {
            this.loading = true;
            this.store.dispatch(CoursesActions.loadAllCourses());
          }
        }),
        filter(coursesLoaded => coursesLoaded), // This filter will allow the completion of the observable (first)
        first(), // The first will complete the observable to avoid infinite loop
        finalize(() => this.loading = false)
      );
  }
}
