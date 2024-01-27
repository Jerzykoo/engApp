import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { IUser } from './types';
import { ConstsService } from 'src/app/core/services/const.service';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

export const config: any = {
  requirements: {
    secondLevel: 40,
    thirdLevel: 80,
  },
};

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(
    private apiService: ApiService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone,
    private constsService: ConstsService,
    private firestore: Firestore
  ) {}

  user = {
    fullName: 'Patryk Grzela',
    level: 1,
    points: 0,
  };

  public getUsers(name?: string): Observable<IUser[]> {
    return this.apiService.get(name ? `/api/user/search=${name}` : `/api/user`);
  }

  updateUser(userId: string, updatedUserData: any): Observable<void> {
    const userRef = doc(this.firestore, 'users', userId);

    return new Observable((observer) => {
      updateDoc(userRef, updatedUserData)
        .then(() => {
          observer.next();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getFirstLevelQuiz() {}
}
