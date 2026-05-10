import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card-stat',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article class="card card-stat">
    <span class="card-eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
    <ng-content></ng-content>
  </article>`,
  styles: `
    .card { padding: 20px; border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); backdrop-filter: blur(28px); display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-1); }
    .card-stat .num { font-size: 56px; font-weight: 500; letter-spacing: -0.04em; line-height: 1; }
    .card-stat .delta { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; border-radius: 999px; background: color-mix(in oklab, var(--success) 30%, transparent); color: var(--success); font-family: var(--mono); font-size: 12px; }
    .card-stat .delta.-neg { background: color-mix(in oklab, var(--danger) 30%, transparent); color: var(--danger); }
    .card-eyebrow { font-family: var(--mono); font-size: 11px; color: var(--ink-mute); }
  `,
})
export class CardStatComponent {
  @Input() eyebrow = '';
}
