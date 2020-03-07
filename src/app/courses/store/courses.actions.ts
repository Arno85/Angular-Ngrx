import { createAction, props } from '@ngrx/store';
import { Course } from '../model/course';
import { Update } from '@ngrx/entity';

const loadAllCourses = createAction(
  '[Courses Resolver] Load All Courses',
);

const allCoursesLoaded = createAction(
  '[Load Courses Effect] All Courses Loaded',
  props<{ courses: Course[] }>()
);

const courseUpdated = createAction(
  '[Edit Course Dialog] Course Updated',
  props<{ update: Update<Course> }>()
);

export const CoursesActions = {
  loadAllCourses,
  allCoursesLoaded,
  courseUpdated
};
