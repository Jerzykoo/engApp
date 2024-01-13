import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCacheManager } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { StateResetAll } from 'ngxs-reset-plugin';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { TokenService } from 'src/app/core/services/token.service';
import { SetUser } from 'src/app/modules/auth/store/actions';
import { IAuthToken, IAuthTokens, ILogin, IResponseUser, IUser } from './types';
import { Auth } from '@angular/fire/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private store: Store,
    private manager: HttpCacheManager,
    private router: Router,
    private zone: NgZone
  ) {}
  private auth: Auth = inject(Auth);
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
        this.store.dispatch(new SetUser(userCredential.user));
        this.tokenService.saveToken(userCredential._tokenResponse.idToken);
        this.router.navigate(['/admin/users']);
      })
      .catch((error) => {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
      });

    // this.afAuth.auth
    //   .signInWithEmailAndPassword(authData.email, authData.password)
    //   .then(result => {
    //     console.log(result);
    //     this.authSuccessfully();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  register(authData: any) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, authData.email, authData.password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  public getUsers(): Observable<IUser> {
    return this.apiService.get(`/api/user`);
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.store
      .dispatch(new StateResetAll())
      .subscribe(() => this.zone.run(() => this.router.navigateByUrl('/auth')));
  }
}
