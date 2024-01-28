import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../store/service';
import { email } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public isSubmitting = false;
  public form: UntypedFormGroup = this.fb.group({
    email: [
      'test@gmail.com',
      [Validators.required, Validators.maxLength(256), email],
    ],
    password: [
      'Test123!',
      [Validators.required, Validators.maxLength(64), Validators.minLength(8)],
    ],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService
  ) {}

  public submitForm(): void {
    this.authService.register(this.form.value);
  }
}
