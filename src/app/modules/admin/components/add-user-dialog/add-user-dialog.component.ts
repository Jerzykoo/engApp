import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { email } from 'src/app/utils/validators';
import { ConstsService } from 'src/app/core/services/const.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  public form: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(256), email]],
    firstName: ['', [Validators.required, Validators.maxLength(64)]],
    lastName: ['', [Validators.required, Validators.maxLength(64)]],
    password: ['', [Validators.required, Validators.maxLength(64)]],
    roleId: [1, [Validators.required]],
  });

  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    public constsService: ConstsService,
    private ref: MatDialogRef<AddUserDialogComponent>
  ) {}

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
