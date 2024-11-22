import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { newCourseResolver } from './new-course.resolver';

describe('newCourseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => newCourseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
