import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="tag" [class.-glow]="glow"><ng-content></ng-content></span>`,
  styles: `
    .tag { display: inline-flex; padding: 4px 10px; border-radius: 999px; font-size: 12px; background: var(--glass-2); border: 1px solid var(--hairline); color: var(--ink-soft); }
    .tag.-glow { background: color-mix(in oklab, var(--accent) 25%, transparent); border-color: color-mix(in oklab, var(--accent) 40%, transparent); color: var(--ink); }
  `,
})
export class TagComponent {
  @Input() glow = false;
}
