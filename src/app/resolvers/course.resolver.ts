import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { CoursesActions } from '../stores/course/action-types';
import { allCoursesLoaded } from '../stores/course/course-selectors';
import { AppState } from '../stores/app-state';

export const courseResolver: ResolveFn<unknown> = () => {
  const store = inject(Store<AppState>);
  let loading = false;

  return store.pipe(
    select(allCoursesLoaded),
    tap((allCoursesLoaded) => {
      if (!loading && !allCoursesLoaded) {
        loading = true;
        store.dispatch(CoursesActions.loadCourses());
      }
    }),
    filter((allCoursesLoaded) => allCoursesLoaded),
    first(),
    finalize(() => (loading = false))
  );
};
