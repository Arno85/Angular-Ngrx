import { createAction, props } from '@ngrx/store';
import { Course } from '../model/course';

const loadAllCourses = createAction(
  '[Courses Resolver] Load All Courses',
);

const allCoursesLoaded = createAction(
  '[Load Courses Effect] All Courses Loaded',
  props<{ courses: Course[] }>()
);

export const CoursesActions = {
  loadAllCourses,
  allCoursesLoaded
};
