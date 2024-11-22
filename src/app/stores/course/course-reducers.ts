import { createReducer, on } from '@ngrx/store';
import { coursesAdapter } from './course-state';
import { CoursesActions } from './action-types';

export const initialCourseState = coursesAdapter.getInitialState({
  loading: false,
  error: null,
  allCoursesLoaded: false,
});

export const courseReducer = createReducer(
  initialCourseState,
  on(CoursesActions.loadCourses, (state) => ({
    ...state,
    loading: true,
  })),
  on(CoursesActions.coursesLoaded, (state, action) =>
    coursesAdapter.addMany(action.courses, {
      ...state,
      loading: false,
      allCoursesLoaded: true,
    })
  ),
  on(CoursesActions.updateCourse, (state, action) =>
    coursesAdapter.updateOne(action.updated, state)
  )
);
