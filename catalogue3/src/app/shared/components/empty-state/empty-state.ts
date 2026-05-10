import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="empty">
    <h5>{{ title }}</h5>
    <p>{{ description }}</p>
    <ng-content></ng-content>
  </div>`,
  styles: `
    .empty { padding: 40px; border-radius: var(--r-4); border: 1px dashed var(--hairline-bold); background: var(--glass-1); text-align: center; }
    .empty h5 { margin-bottom: 6px; }
    .empty p { font-size: 14px; color: var(--ink-mute); }
  `,
})
export class EmptyStateComponent {
  @Input() title = '';
  @Input() description = '';
}
