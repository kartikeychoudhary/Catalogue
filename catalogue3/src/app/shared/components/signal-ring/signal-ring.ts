import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-signal-ring',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="signal-ring" [style.background]="'conic-gradient(var(--accent) ' + (percentage / 100 * 360) + 'deg, var(--glass-2) 0)'">
    <span class="value">{{ percentage }}</span>
  </div>`,
  styles: `
    .signal-ring {
      width: 56px; height: 56px; border-radius: 50%;
      display: grid; place-items: center;
      mask: radial-gradient(circle, transparent 50%, black 51%);
      position: relative;
    }
    .signal-ring .value {
      position: absolute; inset: 0; display: grid; place-items: center;
      font-family: var(--mono); font-size: 14px; color: var(--ink);
    }
  `,
})
export class SignalRingComponent {
  @Input() percentage = 78;
}
