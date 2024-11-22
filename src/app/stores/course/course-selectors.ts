import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, coursesAdapter } from './course-state';

export const { selectAll } = coursesAdapter.getSelectors();

const selectCourseState = createFeatureSelector<CourseState>('courses');

export const getCourses = createSelector(selectCourseState, selectAll);

export const getBeginnerCourses = createSelector(getCourses, (courses) =>
  courses.filter((course) => course.category == 'BEGINNER')
);

export const getIntermediateCourses = createSelector(getCourses, (courses) =>
  courses.filter((course) => course.category == 'INTERMEDIATE')
);

export const getAdvancedCourses = createSelector(getCourses, (courses) =>
  courses.filter((course) => course.category == 'ADVANCED')
);

export const isLoadingCourses = createSelector(
  selectCourseState,
  (state) => state.loading
);

export const getPromoTotal = createSelector(
  getCourses,
  (courses) => courses.filter((course) => course.promo).length
);

export const allCoursesLoaded = createSelector(
  selectCourseState,
  (state) => state.allCoursesLoaded
);
