import { Routes } from '@angular/router';
import { coursesGuard } from '../guards/courses.guard';

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses.routes').then((r) => r.coursesRoutes),
    canActivate: [coursesGuard],
  },

  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
];
