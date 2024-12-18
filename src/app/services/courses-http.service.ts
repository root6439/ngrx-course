import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../shared/models/course';
import { Lesson } from '../shared/models/lesson';

@Injectable({ providedIn: 'root' })
export class CoursesHttpService {
  private readonly http = inject(HttpClient);

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get<any>('http://localhost:9000/api/courses')
      .pipe(map((res) => res['payload']));
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.http.get<Course>(
      `http://localhost:9000/api/courses/${courseUrl}`
    );
  }

  findLessons(
    courseId: number,
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('http://localhost:9000/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('sortOrder', 'asc')
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  saveCourse(courseId: number | string, changes: Partial<Course>) {
    return this.http.put(
      'http://localhost:9000/api/course/' + courseId,
      changes
    );
  }
}
