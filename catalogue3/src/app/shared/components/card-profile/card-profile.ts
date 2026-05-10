import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-profile',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article class="card"><ng-content></ng-content></article>`,
  styles: `
    .card { padding: 20px; border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); backdrop-filter: blur(28px); display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-1); }
  `,
})
export class CardProfileComponent {}
