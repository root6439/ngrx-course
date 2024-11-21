import { createAction, props } from '@ngrx/store';
import { Course } from '../../shared/models/course';

export const loadCourses = createAction('[Courses Resolver] Load Courses');

export const coursesLoaded = createAction(
  '[Load Courses Effect] Courses Loaded',
  props<{ courses: Course[] }>()
);
