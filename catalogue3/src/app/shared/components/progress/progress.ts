import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="progress"><span [style.width]="value + '%'"></span></div>`,
  styles: `
    .progress { height: 8px; border-radius: 999px; background: var(--glass-2); border: 1px solid var(--hairline); overflow: hidden; }
    .progress > span { display: block; height: 100%; background: linear-gradient(90deg, var(--aurora-1), var(--aurora-3)); }
  `,
})
export class ProgressComponent {
  @Input() value = 0;
}
