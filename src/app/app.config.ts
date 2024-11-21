import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { loginReducer } from './stores/login/login-reducer';
import { provideEffects } from '@ngrx/effects';
import * as loginEffects from './stores/login/login-effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { metaReducers } from './stores/app-meta-reducers';
import { courseEffect } from './stores/course/course-effect';
import { courseReducer } from './stores/course/course-reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(
      { auth: loginReducer, courses: courseReducer, routerReducer },
      {
        metaReducers: metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(loginEffects, { courseEffect }),
    provideRouterStore(),
  ],
};
