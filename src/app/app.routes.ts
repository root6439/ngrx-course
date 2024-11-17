import { Routes } from '@angular/router';
import { CourseComponent } from './courses/course/course.component';
import { HomeComponent } from './courses/home/home.component';

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
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'courses',
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
