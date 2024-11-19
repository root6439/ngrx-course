import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../shared/Material.module';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../stores/app-state';
import { LoginActions } from '../stores/login/action-types';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly store = inject(Store<AppState>);

  form: FormGroup = this.fb.group({
    email: ['test@angular-university.io', [Validators.required]],
    password: ['test', [Validators.required]],
  });

  login() {
    const { email, password } = this.form.value;
    this.authService
      .login(email, password)
      .pipe(
        tap((user) => {
          this.store.dispatch(LoginActions.login({ user }));
        })
      )
      .subscribe();
  }
}
