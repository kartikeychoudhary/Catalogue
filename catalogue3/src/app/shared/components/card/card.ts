import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article class="card"><ng-content></ng-content></article>`,
  styles: `
    .card {
      padding: 20px; border-radius: var(--r-4); border: 1px solid var(--hairline);
      background: var(--glass-1); backdrop-filter: blur(28px) saturate(140%);
      display: flex; flex-direction: column; gap: 14px; position: relative; overflow: hidden;
      box-shadow: var(--shadow-1);
    }
    .card::before { content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(255,255,255,0.08), transparent 30%); pointer-events:none; }
  `,
})
export class CardComponent {
  @Input() class = '';
}
