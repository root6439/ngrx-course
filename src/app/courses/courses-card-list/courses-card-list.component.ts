import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Course } from '../../shared/models/course';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { AngularMaterialModule } from '../../shared/Material.module';
import { RouterModule } from '@angular/router';
import { CourseEntityService } from '../../services/course-entity.service';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css'],
  imports: [AngularMaterialModule, RouterModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly courseService = inject(CourseEntityService);

  courses = input.required<Course[]>();

  courseChanged = output();

  editCourse(course: Course) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update',
    };

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());
  }

  onDeleteCourse(course: Course) {
    this.courseService.delete(course);
  }
}
