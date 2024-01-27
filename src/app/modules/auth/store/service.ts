import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { StateResetAll } from 'ngxs-reset-plugin';
import { Observable, from, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';
import { SetUser } from 'src/app/modules/auth/store/actions';
import { IAuthToken, IAuthTokens, ILogin, IResponseUser, IUser } from './types';
import { Auth, authState } from '@angular/fire/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore'; // Zauważ użycie 'compat'
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Firestore, docData, getDoc } from '@angular/fire/firestore';
import { AuthState } from './state';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone,
    private firestore: Firestore,
    private toast: HotToastService
  ) {}

  private auth: Auth = inject(Auth);
  currentUser$ = authState(this.auth);
  // private firebase: FirebaseApp = inject(FirebaseApp);
  public getCurrentUser(token: number): Observable<IUser> {
    return this.apiService.get(`/api/auth/${token}`);
  }

  public fetchProfile(id: number): Observable<IUser> {
    return this.apiService.get(`/api/user/${id}`).pipe(
      tap((data: IUser) => {
        this.tokenService.saveFullName(data.firstName + ' ' + data.lastName);
        this.store.dispatch(new SetUser(data));
      })
    );
  }

  // public login(data: ILogin): Observable<IUser> {
  //   return this.apiService.post('/api/auth', data).pipe(
  //     switchMap((data: IResponseUser) => {
  //       this.tokenService.saveToken(data.userToken);
  //       this.tokenService.saveRole(data.roleId);
  //       this.tokenService.saveUserId(data.userId);
  //       return this.fetchProfile(data.userId);
  //     })
  //   );
  // }

  login(authData: any) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, authData.email, authData.password)
      .then((userCredential: any) => {
        console.log(userCredential);
        this.tokenService.saveToken(userCredential._tokenResponse.idToken);
        // this.addUserInfo();
        const uid = userCredential.user.uid;
        this.getUserById(uid).subscribe((res) => {
          this.store.dispatch(new SetUser(res));
        });
        // console.log(uid);
        this.getCurrentUserProfile();
        // const userCollectionRef = collection(this.firestore, 'users');
        // let user = {
        //   name: 'John Doe',
        //   age: 25,
        //   city: 'New York',
        //   uid: uid,
        // };
        // this.addDocument();

        this.router.navigate(['/admin/users']);
      })
      .catch((error) => {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  getCurrentUserProfile(): Observable<any> {
    console.log('g');
    console.log(this.currentUser$);

    return this.currentUser$.pipe(
      switchMap((user) => {
        console.log(user);

        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        console.log(ref);

        return docData(ref) as Observable<any>;
      })
    );
  }

  addUser(user: any): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  getUserById(userId: string): Observable<any> {
    const userRef = doc(this.firestore, 'users', userId);

    return new Observable((observer) => {
      getDoc(userRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            observer.next(userData);
          } else {
            observer.error('User not found');
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // getUserData(uid: string): void {
  //   const userRef = this.firestore.collection('users').doc(uid);
  //   userRef.get().subscribe((doc: any) => {
  //     if (doc.exists()) {
  //       console.log('Dane użytkownika:', doc.data() as DocumentData);
  //     } else {
  //       console.log('Brak danych użytkownika w Firestore.');
  //     }
  //   });
  // }

  register(authData: any) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, authData.email, authData.password)
      .then((userCredential) => {
        console.log(userCredential);
        // const user = userCredential.user;
        const uid = userCredential.user.uid;
        let user = {
          email: userCredential?.user?.email,
          level: 1,
          points: 0,
          uid: uid,
        };
        console.log(user);

        this.addUser(user).subscribe();
      })
      .catch((error) => {
        this.toast.warning(error?.message);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  public getUsers(): Observable<IUser> {
    return this.apiService.get(`/api/user`);
  }

  getUser() {
    return this.store.select(AuthState.user);
    // .pipe(filter<any | null>(Boolean), take(1));
  }

  public logout(): void {
    console.log('logout');
    localStorage.clear();
    this.tokenService.removeToken();
    this.store
      .dispatch(new StateResetAll())
      .subscribe(() => this.zone.run(() => this.router.navigateByUrl('/auth')));
  }
}
