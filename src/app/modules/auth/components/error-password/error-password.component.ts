import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-password',
  templateUrl: './error-password.component.html',
})
export class ErrorPasswordComponent {
  @Input() public errorName!: string;
  @Input() public passwordForm!: any;
  @Input() public key!: string;

  public get icon(): string {
    if (this.passwordForm?.errors && this.passwordForm?.errors[this.key]) {
      return 'gm-correct-red';
    } else if (!this.passwordForm?.value?.length) {
      return 'gm-correct-grey';
    } else {
      return 'gm-correct-green';
    }
  }

  public getColor(): { color: string } {
    if (this.passwordForm?.errors && this.passwordForm?.errors[this.key]) {
      return { color: '#CC1818' };
    } else if (!this.passwordForm?.value?.length) {
      return { color: '#999999' };
    } else {
      return { color: '#8AC44B' };
    }
  }
}
