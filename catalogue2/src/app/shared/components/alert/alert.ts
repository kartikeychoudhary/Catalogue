import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export type AlertVariant = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-alert',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() actionLabel?: string;
  @Output() actionClick = new EventEmitter<void>();
}
