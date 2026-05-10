import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type ToastVariant = 'default' | 'success';

@Component({
  selector: 'app-toast',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent {
  @Input() message = '';
  @Input() showDot = true;
  @Input() actionLabel?: string;
  @Input() variant: ToastVariant = 'default';
  @Output() dismiss = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<void>();
}
