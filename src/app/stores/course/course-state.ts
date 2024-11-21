import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { compareCourses, Course } from '../../shared/models/course';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  error: any;
}

export const coursesAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});
