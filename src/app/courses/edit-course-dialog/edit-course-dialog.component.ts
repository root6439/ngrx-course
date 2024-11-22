import { Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../shared/models/course';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../../shared/Material.module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CoursesActions } from '../../stores/course/action-types';
import { CourseEntityService } from '../../services/course-entity.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css'],
  imports: [AngularMaterialModule, ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class EditCourseDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);
  // private readonly store = inject(Store);
  private readonly courseService = inject(CourseEntityService);

  form: FormGroup;

  dialogTitle = signal<string>('');
  course = signal<Course>(null);
  mode = signal<'create' | 'update'>('create');

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.dialogTitle.set(data.dialogTitle);
    this.course.set(data.course);
    this.mode.set(data.mode);

    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []] as any,
    };

    if (this.mode() == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.course });
    } else if (this.mode() == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required],
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const course: Course = {
      ...this.course(),
      ...this.form.value,
    };

    if (this.mode() == 'create') {
      // this.store.dispatch(CoursesActions.createCourse({ course }));
    } else {
      this.courseService.update(course);
      this.dialogRef.close();
    }
  }
}
