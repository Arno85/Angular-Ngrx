import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Course, compareCourses } from '../model/course';
import { CoursesActions } from './courses.actions';

const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});
const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const CoursesStoreProperty = 'courses';

export const {
  selectAll
} = adapter.getSelectors();

export const CoursesReducer = createReducer(
  initialCoursesState,

  on(
    CoursesActions.allCoursesLoaded,
    (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true})
  ),

  on(
    CoursesActions.courseUpdated,
    (state, action) => adapter.updateOne(action.update, state)
  )

);
