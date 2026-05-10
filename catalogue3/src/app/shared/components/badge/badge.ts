import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge" [class]="variantClasses">
    <span class="d" *ngIf="showDot"></span><ng-content></ng-content>
  </span>`,
  styles: `
    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 500; background: var(--glass-2); border: 1px solid var(--hairline); color: var(--ink-soft); }
    .badge .d { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
    .badge.-success { color: var(--success); background: color-mix(in oklab, var(--success) 18%, transparent); border-color: color-mix(in oklab, var(--success) 35%, transparent); }
    .badge.-warning { color: var(--warning); background: color-mix(in oklab, var(--warning) 18%, transparent); border-color: color-mix(in oklab, var(--warning) 35%, transparent); }
    .badge.-danger { color: var(--danger); background: color-mix(in oklab, var(--danger) 18%, transparent); border-color: color-mix(in oklab, var(--danger) 35%, transparent); }
    .badge.-info { color: var(--info); background: color-mix(in oklab, var(--info) 18%, transparent); border-color: color-mix(in oklab, var(--info) 35%, transparent); }
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() showDot = true;

  get variantClasses(): string {
    return this.variant !== 'default' ? '-' + this.variant : '';
  }
}

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
