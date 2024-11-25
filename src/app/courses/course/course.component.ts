import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../shared/models/course';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AngularMaterialModule } from '../../shared/Material.module';
import { CommonModule } from '@angular/common';
import { CourseEntityService } from '../../services/course-entity.service';
import { LessonEntityService } from '../../services/lesson-entity.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  imports: [AngularMaterialModule, CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseEntityService);
  private readonly lessonService = inject(LessonEntityService);

  course = toSignal(
    this.route.params.pipe(
      switchMap((params) =>
        this.courseService.entities$.pipe(
          map((courses) =>
            courses.find((course) => course.url == params['courseUrl'])
          )
        )
      )
    )
  );

  lessons = toSignal(
    this.lessonService.entities$.pipe(
      withLatestFrom(toObservable(this.course)),
      tap(([_, course]) => {
        if (this.nextPage == 0) {
          this.loadLessonsPage(course);
        }
      }),
      map(([lessons, course]) =>
        lessons.filter((lesson) => lesson.courseId == course.id)
      )
    )
  );

  loading = toSignal(this.lessonService.loading$);

  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;

  ngOnInit() {
    this.loadLessonsPage(this.course());
  }

  loadLessonsPage(course: Course) {
    this.lessonService.getWithQuery({
      courseId: course.id,
      pageNumber: this.nextPage,
      pageSize: 3,
    });

    this.nextPage += 1;
  }
}
