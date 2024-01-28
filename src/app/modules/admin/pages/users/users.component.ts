import { Component } from '@angular/core';
import { AdminService } from '../../store/service';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/modules/auth/store/service';
import { SetUser } from 'src/app/modules/auth/store/actions';
import { IUser } from 'src/app/modules/auth/store/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  gameConfig = environment.gameConfig;
  public isLoading = false;
  public users!: IUser[];
  public email!: any;
  public formSearch: UntypedFormGroup = this.fb.group({
    search: '',
  });
  user!: IUser;
  maxLevel!: number;
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.maxLevel = environment.gameConfig.maxLevel;
    this.isLoading = true;
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }

  updateUser() {
    let user = { ...this.user };
    user.level = 1;
    this.adminService.updateUser(user).subscribe((res: any) => {
      this.store.dispatch(new SetUser(user));
    });
  }

  get neededPoints() {
    if (this?.user?.level === 1) {
      return this?.gameConfig?.secondLevel - this?.user?.points;
    } else if (this?.user?.level === 2) {
      return this?.gameConfig?.thirdLevel - this?.user?.points;
    }
    return '';
  }
}
