import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import type { IconName } from '../icon/icon.types';
import type { ButtonVariant, ButtonSize } from '../button/button.types';

@Component({
  selector: 'app-icon-button',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: IconName;
  @Input() variant: ButtonVariant = 'secondary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() ariaLabel?: string;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get iconSize(): number {
    if (this.size === 'sm') return 16;
    if (this.size === 'lg') return 24;
    return 20;
  }
}
