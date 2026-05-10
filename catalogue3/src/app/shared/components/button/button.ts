import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import type { ButtonVariant, ButtonSize } from './button.types';

@Component({
  selector: 'app-button',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'secondary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() clicked = new EventEmitter<void>();
}
