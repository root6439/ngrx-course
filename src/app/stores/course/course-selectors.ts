import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course-state';
import { compareCourses } from '../../shared/models/course';

const selectCourseState = createFeatureSelector<CourseState>('courses');

export const getCourses = createSelector(selectCourseState, (state) =>
  [...state.courses]?.sort(compareCourses)
);

export const getBeginnerCourses = createSelector(getCourses, (courses) =>
  courses.filter((course) => course.category == 'BEGINNER')
);

export const getAdvancedCourses = createSelector(getCourses, (courses) =>
  courses.filter((course) => course.category == 'ADVANCED')
);

export const isLoadingCourses = createSelector(
  selectCourseState,
  (state) => state.loading
);

export const getPromoTotal = createSelector(
  selectCourseState,
  (state) => state.courses.filter((course) => course.promo).length
);
