import { Component, Inject } from '@angular/core';
import { AdminService } from '../../store/service';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/store/service';
import { IUser } from 'src/app/modules/auth/store/types';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
})
export class AchievementsComponent {
  public isLoading = false;
  public email!: any;
  private subscription$: Subscription = new Subscription();
  public formSearch: UntypedFormGroup = this.fb.group({
    search: '',
  });
  user!: IUser;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private toast: HotToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
      this.isLoading = false;
    });
  }
}
