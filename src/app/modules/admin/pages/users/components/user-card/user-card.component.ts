import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from 'src/app/modules/auth/store/types';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() public user!: IUser;
  @Output() public edit: EventEmitter<number> = new EventEmitter();
  @Output() public remove: EventEmitter<void> = new EventEmitter();
}
