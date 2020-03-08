import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesEntityService } from './../services/courses-entity.service';
import { map, tap, filter, first } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(private coursesEntityService: CoursesEntityService) { }

  resolve(): Observable<boolean> {
    return this.coursesEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.coursesEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
