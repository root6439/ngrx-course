import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesActions } from './action-types';
import { concatMap, exhaustMap, map } from 'rxjs/operators';
import { CoursesHttpService } from '../../services/courses-http.service';

export const courseEffect = createEffect(
  (action$ = inject(Actions), coursesService = inject(CoursesHttpService)) =>
    action$.pipe(
      ofType(CoursesActions.loadCourses),
      exhaustMap(() =>
        coursesService
          .findAllCourses()
          .pipe(map((courses) => CoursesActions.coursesLoaded({ courses })))
      )
    ),
  { functional: true }
);

export const updateCourseEffect = createEffect(
  (action$ = inject(Actions), coursesService = inject(CoursesHttpService)) =>
    action$.pipe(
      ofType(CoursesActions.updateCourse),
      concatMap((action) =>
        coursesService.saveCourse(action.updated.id, action.updated.changes)
      )
    ),
  { functional: true, dispatch: false }
);
