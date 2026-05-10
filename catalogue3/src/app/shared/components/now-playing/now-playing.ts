import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-now-playing',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="glass now-playing">
    <div class="np-art">
      <span class="label">NOW PLAYING · BINAURAL</span>
    </div>
    <div class="np-meta">
      <div>
        <div class="np-title">{{ title }}</div>
        <div class="np-sub">{{ subtitle }}</div>
      </div>
      <button class="icon-btn" aria-label="Heart">♡</button>
    </div>
    <div class="np-progress"><span [style.width]="progress + '%'"></span></div>
    <div class="np-time"><span>{{ currentTime }}</span><span>-{{ remainingTime }}</span></div>
    <div class="np-controls">
      <button>⏮</button>
      <button class="play">▶</button>
      <button>⏭</button>
    </div>
  </div>`,
  styles: `
    .glass { background: var(--glass-1); border: 1px solid var(--hairline); border-radius: var(--r-4); backdrop-filter: blur(28px); box-shadow: var(--shadow-2); overflow: hidden; position: relative; }
    .glass::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 35%); mix-blend-mode: overlay; }
    .now-playing { padding: 22px; display: flex; flex-direction: column; gap: 14px; }
    .np-art {
      height: 168px; border-radius: var(--r-3); position: relative; overflow: hidden;
      background:
        radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--aurora-1) 70%, transparent), transparent 55%),
        radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--aurora-2) 70%, transparent), transparent 55%),
        radial-gradient(circle at 80% 20%, color-mix(in oklab, var(--aurora-3) 60%, transparent), transparent 55%);
      filter: saturate(140%);
    }
    .np-art::after { content: ""; position: absolute; inset: 0; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.4)); border-radius: inherit; }
    .np-art .label { position: absolute; left: 14px; bottom: 14px; z-index: 2; font-family: var(--mono); font-size: 11px; padding: 4px 8px; background: rgba(0,0,0,0.4); border-radius: 999px; color: white; }
    .np-meta { display: flex; align-items: center; justify-content: space-between; }
    .np-title { font-weight: 600; font-size: 16px; }
    .np-sub { font-size: 12px; color: var(--ink-mute); margin-top: 2px; }
    .np-controls { display: flex; gap: 10px; align-items: center; justify-content: center; }
    .np-controls button { width: 38px; height: 38px; border-radius: 999px; border: 1px solid var(--hairline); background: var(--glass-2); color: var(--ink); cursor: pointer; }
    .np-controls .play { width: 50px; height: 50px; background: var(--ink); color: var(--bg-deep); border: 0; }
    .np-progress { height: 4px; background: var(--glass-2); border-radius: 999px; overflow: hidden; }
    .np-progress > span { display: block; height: 100%; width: 38%; background: linear-gradient(90deg, var(--aurora-1), var(--aurora-3)); border-radius: 999px; }
    .np-time { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; color: var(--ink-mute); }
    .icon-btn { width: 36px; height: 36px; border-radius: 999px; border: 1px solid var(--hairline); background: var(--glass-2); color: var(--ink); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 14px; }
  `,
})
export class NowPlayingComponent {
  @Input() title = 'Slow Tide, North Atlantic';
  @Input() subtitle = 'Aurora Sessions · 32 min focus block';
  @Input() progress = 38;
  @Input() currentTime = '11:48';
  @Input() remainingTime = '−20:12';
}
