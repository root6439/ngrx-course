import { Routes } from '@angular/router';
import { CourseComponent } from '../courses/course/course.component';
import { HomeComponent } from '../courses/home/home.component';
import { courseResolver } from '../resolvers/course.resolver';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { courses: courseResolver },
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
  },
];
