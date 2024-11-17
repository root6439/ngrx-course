import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../shared/models/course';
import { Observable } from 'rxjs';
import { Lesson } from '../../shared/models/lesson';
import { concatMap, tap } from 'rxjs/operators';
import { AngularMaterialModule } from '../../shared/Material.module';
import { CommonModule } from '@angular/common';
import { CoursesHttpService } from '../../services/courses-http.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  standalone: true,
  imports: [AngularMaterialModule, CommonModule],
})
export class CourseComponent implements OnInit {
  private readonly coursesService = inject(CoursesHttpService);
  private readonly route = inject(ActivatedRoute);

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  loading$: Observable<boolean>;

  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.coursesService.findCourseByUrl(courseUrl);

    this.lessons$ = this.course$.pipe(
      concatMap((course) => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );
  }

  loadLessonsPage(course: Course) {}
}
