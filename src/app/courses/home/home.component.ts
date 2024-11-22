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
  private readonly store = inject(Store);

  promoTotal = toSignal(this.store.select(getPromoTotal));
  beginnerCourses = toSignal(this.store.select(getBeginnerCourses));
  intermediateCourses = toSignal(this.store.select(getIntermediateCourses));
  advancedCourses = toSignal(this.store.select(getAdvancedCourses));

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
