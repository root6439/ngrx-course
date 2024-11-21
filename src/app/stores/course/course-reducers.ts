import { createReducer, on } from '@ngrx/store';
import { CourseState } from './course-state';
import { CoursesActions } from './action-types';

export const initialCourseState: CourseState = {
  courses: [],
  error: null,
  loading: false,
};

export const courseReducer = createReducer(
  initialCourseState,
  on(CoursesActions.loadCourses, (state) => ({
    ...state,
    loading: true,
  })),
  on(CoursesActions.coursesLoaded, (state, action) => ({
    ...state,
    courses: action.courses,
    loading: false
  }))
);
