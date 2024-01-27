import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { Login, SetUser } from './actions';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/modules/auth/store/types';
import { AuthService } from 'src/app/modules/auth/store/service';
import { TokenService } from 'src/app/core/services/token.service';

interface IAuthState {
  user: IUser;
  splashscreen: boolean;
}

@State<IAuthState>({
  name: 'auth',
  defaults: {
    user: <any>null,
    splashscreen: false,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static user(state: IAuthState): IUser {
    return state.user;
  }

  @Selector()
  static splashscreen(state: IAuthState): boolean {
    return state.splashscreen;
  }

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private store: Store
  ) {}

  // ngxsOnInit(ctx: StateContext<IAuthState>): void {
  //   if (this.tokenService.getToken()) {
  //     ctx.patchState({ splashscreen: true });
  //     this.authService.fetchProfile().subscribe(
  //       () => ctx.patchState({ splashscreen: false }),
  //       () => ctx.patchState({ splashscreen: false }),
  //     );
  //   }
  // }

  @Action(SetUser)
  public SetUser(ctx: StateContext<IAuthState>, action: SetUser): void {
    console.log(action);

    ctx.patchState({ user: action.user });
  }
}
