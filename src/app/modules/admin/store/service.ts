import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';

import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ConstService } from 'src/app/core/services/const.service';
import { IUser } from '../../auth/store/types';

export const gameConfig: any = {
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
    private constService: ConstService,
    private firestore: Firestore
  ) {}

  user = {
    fullName: 'Patryk Grzela',
    level: 1,
    points: 0,
  };

  // updateUser(userId: string, updatedUserData: any): Observable<void> {
  //   const userRef = doc(this.firestore, 'users', userId);

  //   return new Observable((observer) => {
  //     updateDoc(userRef, updatedUserData)
  //       .then(() => {
  //         observer.next();
  //       })
  //       .catch((error) => {
  //         observer.error(error);
  //       });
  //   });
  // }

  updateUser(user: any): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, user));
  }

  getFirstLevelQuiz() {}
}
