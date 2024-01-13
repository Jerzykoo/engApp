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
import { UserRolesEnum } from '../../store/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public isSubmitting = false;
  public showPasswordScreen = false;
  public form: UntypedFormGroup = this.fb.group({
    email: [
      'test@gmail.com',
      [Validators.required, Validators.maxLength(256), email],
    ],
    password: ['Test123!', [Validators.required, Validators.maxLength(64)]],
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
    console.log('login');
    this.authService.login(this.form.value);

    // this.authService.login(this.form.value).subscribe((val) => {
    //   if (val.roleId === UserRolesEnum.ADMIN) {
    //     this.router.navigate(['/admin/users']);
    //   } else if (val.roleId === UserRolesEnum.LIBRARIAN) {
    //     this.router.navigate(['/librarian/books']);
    //   } else if (val.roleId === UserRolesEnum.READER) {
    //     this.router.navigate(['/user/books']);
    //   }
    // });

    // this.router.navigate(['/admin/users']);
  }
}
