import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { finalize, from, switchMap } from 'rxjs';
import { AuthService } from '../../store/service';
import { email } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public isSubmitting = false;
  public showPasswordScreen = false;
  public form: UntypedFormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.maxLength(256), email]],
    password: [
      null,
      [Validators.required, Validators.maxLength(64), Validators.minLength(8)],
    ],
  });
  public checkboxForm: UntypedFormGroup = this.fb.group({
    isRemember: [false],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}

  public submitForm(): void {
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }
  }
}
