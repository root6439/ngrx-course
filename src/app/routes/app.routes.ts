import { Routes } from '@angular/router';
import { coursesGuard } from '../guards/courses.guard';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses.routes').then((r) => r.coursesRoutes),
    canActivate: [coursesGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
];
