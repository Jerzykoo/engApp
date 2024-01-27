import { IUser } from 'src/app/modules/auth/store/types';

export class SetUser {
  public static readonly type = '[auth] set user';
  constructor(public user: any) {}
}

export class Login {
  public static readonly type = '[authorization] login';
  constructor(public form: any) {}
}
