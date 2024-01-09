import { Component, Inject } from '@angular/core';
import { AdminService } from '../../store/service';
import { IUser } from '../../store/types';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  FormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { email } from 'src/app/utils/validators';
import { ConstsService } from 'src/app/core/services/const.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent {
  public form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(256), email]],
    firstName: ['', [Validators.required, Validators.maxLength(64)]],
    lastName: ['', [Validators.required, Validators.maxLength(64)]],
    roleId: [1, []],
  });

  constructor(
    public constsService: ConstsService,
    private adminService: AdminService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private ref: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      email: string;
      firstName: string;
      lastName: string;
      roleId: number;
    }
  ) {}

  ngOnInit() {
    this.form.patchValue(this.data);
  }

  public editUser(): void {
    this.closepopup();
  }

  closepopup() {
    this.ref.close(this.form.value);
  }

  // ngOnDestroy() {
  //   this.form.reset();
  // }
}
