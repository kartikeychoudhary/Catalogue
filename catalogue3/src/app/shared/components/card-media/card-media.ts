import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-media',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article class="card card-media"><ng-content></ng-content></article>`,
  styles: `
    .card { border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); backdrop-filter: blur(28px); overflow: hidden; box-shadow: var(--shadow-1); }
    .card-media { padding: 0; }
    .card-media .img {
      height: 180px; position: relative; overflow: hidden;
      background:
        radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--aurora-1) 70%, transparent), transparent 55%),
        radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--aurora-2) 70%, transparent), transparent 55%);
      filter: saturate(140%);
    }
    .card-media .img::after { content:""; position: absolute; inset: 0; backdrop-filter: blur(30px); background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3)); }
    .card-media .img .label { position: absolute; left: 14px; bottom: 14px; z-index: 2; font-family: var(--mono); font-size: 11px; color: white; padding: 4px 10px; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); border-radius: 999px; }
    .card-media .body-pad { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 10px; }
  `,
})
export class CardMediaComponent {}
