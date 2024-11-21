import { Course } from '../../shared/models/course';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: any;
}
