import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { UserRolesEnum } from 'src/app/modules/auth/store/types';

@Component({
  selector: 'app-publisher-card',
  templateUrl: './publisher-card.component.html',
})
export class PublisherCardComponent {
  @Input() public publisher!: any;
  @Output() public edit: EventEmitter<number> = new EventEmitter();
  @Output() public remove: EventEmitter<void> = new EventEmitter();
}
