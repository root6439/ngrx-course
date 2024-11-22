import { createAction, props } from '@ngrx/store';
import { Course } from '../../shared/models/course';
import { Update } from '@ngrx/entity';

export const loadCourses = createAction('[Courses Resolver] Load Courses');

export const coursesLoaded = createAction(
  '[Load Courses Effect] Courses Loaded',
  props<{ courses: Course[] }>()
);

export const updateCourse = createAction(
  '[Edit Course Dialog] Course Updated',
  props<{ updated: Update<Course> }>()
);

export const createCourse = createAction(
  '[Create Course Dialog] Course Created',
  props<{ course: Course }>()
);
