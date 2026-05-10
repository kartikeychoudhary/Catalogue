import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card-pricing',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article class="card card-pricing">
    <span class="card-eyebrow" *ngIf="eyebrow">{{ eyebrow }}</span>
    <ng-content></ng-content>
  </article>`,
  styles: `
    .card { padding: 20px; border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); backdrop-filter: blur(28px); display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-1); }
    .card-pricing .price { font-size: 56px; font-weight: 500; letter-spacing: -0.04em; }
    .card-pricing .price small { font-size: 14px; font-weight: 400; color: var(--ink-mute); margin-left: 4px; }
    .card-pricing ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: var(--ink-soft); }
    .card-pricing li { display: flex; align-items: center; gap: 10px; }
    .card-pricing li::before { content: "✓"; color: var(--accent); font-weight: 700; }
    .card-eyebrow { font-family: var(--mono); font-size: 11px; color: var(--ink-mute); }
  `,
})
export class CardPricingComponent {
  @Input() eyebrow = '';
}
