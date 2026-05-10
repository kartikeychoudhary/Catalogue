import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card-feature',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article class="card card-feature"><ng-content></ng-content></article>`,
  styles: `
    .card {
      padding: 20px; border-radius: var(--r-4); border: 1px solid var(--hairline);
      display: flex; flex-direction: column; gap: 14px; position: relative; overflow: hidden;
      box-shadow: var(--shadow-1);
    }
    .card-feature {
      background:
        radial-gradient(600px 280px at 0% 0%, color-mix(in oklab, var(--aurora-2) 50%, transparent), transparent 60%),
        radial-gradient(500px 280px at 100% 100%, color-mix(in oklab, var(--aurora-1) 50%, transparent), transparent 60%),
        var(--glass-1);
    }
  `,
})
export class CardFeatureComponent {}
