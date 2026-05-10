import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="toast">
    <div class="ico" [style.background]="iconBg">{{ icon }}</div>
    <span class="t">{{ message }}</span>
    <button *ngIf="actionLabel" (click)="actionClicked.emit()">{{ actionLabel }}</button>
  </div>`,
  styles: `
    .toast { display: inline-flex; align-items: center; gap: 12px; padding: 10px 14px 10px 12px; border-radius: 999px; background: var(--glass-3); border: 1px solid var(--hairline-bold); backdrop-filter: blur(28px); box-shadow: var(--shadow-1); }
    .toast .ico { width: 24px; height: 24px; border-radius: 50%; background: var(--accent); display: grid; place-items: center; color: white; font-size: 12px; }
    .toast .t { font-size: 13px; }
    .toast button { margin-left: 6px; background: transparent; border: 0; color: var(--ink-mute); font-size: 13px; cursor: pointer; padding: 4px 8px; }
    .toast button:hover { color: var(--ink); }
  `,
})
export class ToastComponent {
  @Input() message = '';
  @Input() icon = '✓';
  @Input() iconBg?: string;
  @Input() actionLabel = '';
  @Output() actionClicked = new EventEmitter<void>();
}
