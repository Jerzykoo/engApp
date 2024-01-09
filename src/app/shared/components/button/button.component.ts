import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public disabled = false;
  @Input() public isIcon = false;
  @Input() public iconName = '';
  @Input() public isLoading = false;
  @Input() public full = true;
  @Input() public type: 'button' | 'submit' = 'button';
  @Input() public minWidth!: number;
  @Input() public variant: 'default' | 'main' | 'white' | 'gray' | 'red' | 'orange' | 'outline' = 'default';
  @Input() public size: 'default' | 'small' = 'default';
  @Input() public credits?: string | null;

  @HostBinding('class') public get classes(): string {
    return this.full ? 'block w-full' : 'inline-block';
  }
}
