export enum UserRolesEnum {
  ADMIN = 1,
  STUDENT = 2,
}

export interface IUser {
  email: string;
  level: number;
  points: number;
  quizPoints: number;
  listenPoints: number;
  rebusPoints: number;
  uid: string;
}

export interface IResponseUser {
  userId: number;
  roleId: number;
  userToken: string;
  refreshToken: string;
}

export interface IAuthTokens {
  token: string;
  refreshToken: string;
}

export interface IAuthToken {
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
  betaTestToken?: string;
}
