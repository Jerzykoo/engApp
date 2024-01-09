import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService) {}

  public canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (!token) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
}
