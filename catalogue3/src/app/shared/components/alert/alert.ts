import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export type AlertVariant = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-alert',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="alert" [class]="'-' + variant">
    <div class="icon">{{ icon }}</div>
    <div>
      <div class="t">{{ title }}</div>
      <div class="s" *ngIf="subtitle">{{ subtitle }}</div>
    </div>
    <ng-content></ng-content>
  </div>`,
  styles: `
    .alert { padding: 14px 18px; border-radius: var(--r-3); border: 1px solid var(--hairline); background: var(--glass-1); display: grid; grid-template-columns: auto 1fr auto; gap: 14px; align-items: center; backdrop-filter: blur(28px); }
    .alert .icon { width: 32px; height: 32px; border-radius: 999px; display: grid; place-items: center; background: var(--glass-2); border: 1px solid var(--hairline); font-weight: 700; }
    .alert.-success { border-color: color-mix(in oklab, var(--success) 40%, transparent); background: color-mix(in oklab, var(--success) 10%, var(--glass-1)); }
    .alert.-success .icon { background: color-mix(in oklab, var(--success) 30%, transparent); color: var(--success); }
    .alert.-warning { border-color: color-mix(in oklab, var(--warning) 40%, transparent); background: color-mix(in oklab, var(--warning) 10%, var(--glass-1)); }
    .alert.-warning .icon { background: color-mix(in oklab, var(--warning) 30%, transparent); color: var(--warning); }
    .alert.-danger { border-color: color-mix(in oklab, var(--danger) 40%, transparent); background: color-mix(in oklab, var(--danger) 10%, var(--glass-1)); }
    .alert.-danger .icon { background: color-mix(in oklab, var(--danger) 30%, transparent); color: var(--danger); }
    .alert.-info { border-color: color-mix(in oklab, var(--info) 40%, transparent); background: color-mix(in oklab, var(--info) 10%, var(--glass-1)); }
    .alert.-info .icon { background: color-mix(in oklab, var(--info) 30%, transparent); color: var(--info); }
    .alert .t { font-weight: 600; font-size: 14px; }
    .alert .s { font-size: 13px; color: var(--ink-soft); margin-top: 2px; }
  `,
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon = 'i';
}
