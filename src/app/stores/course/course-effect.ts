import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesActions } from './action-types';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { CoursesHttpService } from '../../services/courses-http.service';

export const courseEffect = createEffect(
  (action$ = inject(Actions), coursesService = inject(CoursesHttpService)) => {
    return action$.pipe(
      ofType(CoursesActions.loadCourses),
      exhaustMap(() =>
        coursesService
          .findAllCourses()
          .pipe(map((courses) => CoursesActions.coursesLoaded({ courses })))
      )
    );
  },
  { functional: true }
);
