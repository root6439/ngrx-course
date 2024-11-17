import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AngularMaterialModule } from '../../shared/Material.module';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [AngularMaterialModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    email: ['test@angular-university.io', [Validators.required]],
    password: ['test', [Validators.required]],
  });

  ngOnInit() {}

  login() {}
}
