import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, tap } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CoursesActions } from './courses.actions';

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap(() => this.coursesHttpService.findAllCourses()),
      map(courses => CoursesActions.allCoursesLoaded({ courses })),
    )
  );

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) { }
}
