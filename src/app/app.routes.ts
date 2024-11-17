import { Routes } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { HomeComponent } from './courses/home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'courses',
    component: HomeComponent,
  },
  {
    path: 'courses/:courseUrl',
    component: CourseComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
];

// export const coursesRoutes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//   },
//   {
//     path: ':courseUrl',
//     component: CourseComponent,
//   },
// ];
