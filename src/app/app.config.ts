import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  APP_INITIALIZER,
  provideExperimentalZonelessChangeDetection,
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
import * as coursesEffects from './stores/course/course-effect';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { metaReducers } from './stores/app-meta-reducers';
import { courseReducer } from './stores/course/course-reducers';
import {
  DefaultDataService,
  EntityDataService,
  provideEntityData,
  withEffects,
} from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { CourseEntityService } from './services/course-entity.service';
import { CoursesHttpService } from './services/courses-http.service';
import { CourseDataService } from './services/course-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(
      { auth: loginReducer, routerReducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictStateSerializability: true,
        },
      }
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(loginEffects, coursesEffects),
    provideRouterStore(),
    provideEntityData(entityConfig, withEffects()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      multi: true,
      deps: [EntityDataService, CourseDataService],
    },
    CoursesHttpService,
    CourseEntityService,
    CourseDataService,
  ],
};

export function initializeApplication(
  entityDataService: EntityDataService,
  courseDataService: CourseDataService
) {
  return (): void => {
    entityDataService.registerService('Course', courseDataService);
  };
}
