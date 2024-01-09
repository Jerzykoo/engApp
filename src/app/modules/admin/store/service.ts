import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { IUser } from './types';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone
  ) {}

  public getUsers(name?: string): Observable<IUser[]> {
    return this.apiService.get(name ? `/api/user/search=${name}` : `/api/user`);
  }

  public updateUser(data: any): Observable<IUser[]> {
    return this.apiService.put(`/api/user`, data);
  }

  public addUser(data: any): Observable<IUser[]> {
    return this.apiService.post(`/api/user`, data);
  }
  public removeUser(id: number): Observable<any> {
    return this.apiService.delete(`/api/user/${id}`);
  }
}
