import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { Course } from '../shared/models/course';
import { Store } from '@ngrx/store';
import { finalize, first, tap } from 'rxjs/operators';
import { CoursesActions } from '../stores/course/action-types';

export const courseResolver: ResolveFn<Course[]> = () => {
  const store = inject(Store);
  let loading = false;

  return store.pipe(
    tap((_) => {
      if (!loading) {
        loading = true;
        store.dispatch(CoursesActions.loadCourses());
      }
    }),
    first(),
    finalize(() => (loading = false))
  );
};
