import { Injectable } from '@angular/core';
import { UserRolesEnum } from 'src/app/modules/admin/store/types';

export interface IConstOption {
  title: string;
  value: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConstsService {
  public roles: IConstOption[] = [
    { title: 'Admin', value: UserRolesEnum.ADMIN },
    { title: 'Pracownik', value: UserRolesEnum.LIBRARIAN },
    { title: 'Czytelnik', value: UserRolesEnum.READER },
  ];

  public borrowsOptions: IConstOption[] = [];
  public copyStatusOptions: IConstOption[] = [];
}
