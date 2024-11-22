import { toSignal } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../shared/Material.module';
import { CommonModule } from '@angular/common';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { Store } from '@ngrx/store';
import {
  getAdvancedCourses,
  getBeginnerCourses,
  getIntermediateCourses,
  getPromoTotal,
} from '../../stores/course/course-selectors';
import { CourseEntityService } from '../../services/course-entity.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [AngularMaterialModule, CommonModule, CoursesCardListComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly courseService = inject(CourseEntityService);

  promoTotal = toSignal(
    this.courseService.entities$.pipe(
      map((courses) => courses.filter((course) => course.promo).length)
    )
  );

  beginnerCourses = toSignal(
    this.courseService.entities$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'BEGINNER')
      )
    )
  );

  intermediateCourses = toSignal(
    this.courseService.entities$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'INTERMEDIATE')
      )
    )
  );

  advancedCourses = toSignal(
    this.courseService.entities$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == 'ADVANCED')
      )
    )
  );

  ngOnInit() {
    this.reload();
  }

  reload() {
    // this.store.dispatch(CoursesActions.loadCourses());
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create',
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
