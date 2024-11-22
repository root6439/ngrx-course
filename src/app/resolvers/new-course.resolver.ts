import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CourseEntityService } from '../services/course-entity.service';
import { filter, first, tap } from 'rxjs/operators';

export const newCourseResolver: ResolveFn<boolean> = () => {
  const courseService = inject(CourseEntityService);

  return courseService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        courseService.getAll();
      }
    }),
    filter((loaded) => !!loaded),
    first()
  );
};
