import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { compareCourses, Course } from '../../shared/models/course';

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  error: any;
  allCoursesLoaded: boolean;
}

export const coursesAdapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});
