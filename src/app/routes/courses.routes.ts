import { Routes } from '@angular/router';
import { CourseComponent } from '../courses/course/course.component';
import { HomeComponent } from '../courses/home/home.component';
import { newCourseResolver } from '../resolvers/new-course.resolver';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { courses: newCourseResolver },
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
  },
];
