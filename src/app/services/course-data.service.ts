import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Course } from '../shared/models/course';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseDataService extends DefaultDataService<Course> {
  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Course', httpClient, httpUrlGenerator);
  }

  override getAll(): Observable<Course[]> {
    return this.http
      .get<any>('http://localhost:9000/api/courses')
      .pipe(map((resp) => resp['payload']));
  }
}
