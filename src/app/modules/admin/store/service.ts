import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { IUser } from './types';
import { ConstsService } from 'src/app/core/services/const.service';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone,
    private constsService: ConstsService
  ) {}

  config: any = {
    requirements: {
      secondLevel: 40,
      thirdLevel: 40,
    },
  };

  user = {
    fullName: 'Patryk Grzela',
    level: 1,
    points: 0,
  };

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

  getFirstLevelQuiz() {}
}
