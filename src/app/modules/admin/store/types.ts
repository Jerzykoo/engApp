export enum UserRolesEnum {
  ADMIN = 1,
  LIBRARIAN = 2,
  READER = 3,
}
export enum CopyStatusesEnum {
  Disposed = 'Usunięta',
  Loaned = 'Wypożyczona',
  Available = 'Dostępna',
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roleId: number;
  userID: number;
}

export interface IResponseUser {
  userId: number;
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
