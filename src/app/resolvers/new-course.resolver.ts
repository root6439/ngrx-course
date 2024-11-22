import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CourseEntityService } from '../services/course-entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const newCourseResolver: ResolveFn<Observable<boolean>> = () => {
  const courseService = inject(CourseEntityService);

  return courseService.getAll().pipe(map((courses) => Boolean(courses)));
};
