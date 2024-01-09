import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthState } from 'src/app/modules/auth/store/state';
import { IUser } from 'src/app/modules/auth/store/types';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Select(AuthState.user) user$!: Observable<IUser>;
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private store: Store
  ) {}

  public canActivate(): Observable<boolean> {
    const token = this.tokenService.getToken();
    if (token) {
      return of(true);
    }
    this.router.navigateByUrl('/auth');
    return of(false);
  }
}
