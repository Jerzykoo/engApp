import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenService } from 'src/app/core/services/token.service';
import { AdminService } from 'src/app/modules/admin/store/service';
import { AuthService } from 'src/app/modules/auth/store/service';
import { AuthState } from 'src/app/modules/auth/store/state';
import { IUser, UserRolesEnum } from 'src/app/modules/auth/store/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() public text!: string;
  public role!: string;
  public fullName!: string;
  public popoverOpen = false;
  user!: IUser;
  constructor(
    private authService: AuthService,
    private store: Store,
    public tokenService: TokenService,
    private adminService: AdminService
  ) {}
  // public user$ = this.store.select(AuthState.user);
  public isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
      this.isLoading = false;
    });
  }
  public togglePopover(): void {
    this.popoverOpen = !this.popoverOpen;
  }

  public logout(): void {
    this.authService.logout();
  }
}
