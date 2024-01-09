import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenService } from 'src/app/core/services/token.service';
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
  constructor(
    private authService: AuthService,
    private store: Store,
    public tokenService: TokenService
  ) {}
  // public user$ = this.store.select(AuthState.user);

  ngOnInit() {
    // this.role = UserRolesEnum[this.tokenService.getRole() as any];
    this.role = 'STUDENT';
    this.fullName = this.tokenService.getFullName() as string;
  }
  public togglePopover(): void {
    this.popoverOpen = !this.popoverOpen;
  }

  public logout(): void {
    this.authService.logout();
  }
}
