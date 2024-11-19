import { Routes } from '@angular/router';
import { CourseComponent } from '../courses/course/course.component';
import { HomeComponent } from '../courses/home/home.component';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':courseUrl',
    component: CourseComponent,
  },
];
