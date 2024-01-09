import { Injectable } from '@angular/core';

export const ROLE = 'role';
export const FULLNAME = 'fullName';
export const USERID = 'userId';
export const TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public saveToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }
  public saveRole(role: any): void {
    localStorage.setItem(ROLE, role);
  }
  public saveUserId(userId: any): void {
    localStorage.setItem(USERID, userId);
  }

  public saveFullName(fullname: string): void {
    localStorage.setItem(FULLNAME, fullname);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public getRole(): string | null {
    return localStorage.getItem(ROLE);
  }

  public getFullName(): string | null {
    return localStorage.getItem(FULLNAME);
  }

  public getUserId(): string | null {
    return localStorage.getItem(USERID);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }
}
