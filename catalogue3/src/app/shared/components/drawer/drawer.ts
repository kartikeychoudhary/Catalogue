import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="drawer-stage">
    <div class="drawer" *ngIf="open">
      <ng-content></ng-content>
    </div>
  </div>`,
  styles: `
    .drawer-stage { height: 280px; border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); position: relative; overflow: hidden; }
    .drawer { position: absolute; top: 8px; right: 8px; bottom: 8px; width: 60%; padding: 18px; border-radius: var(--r-3); background: var(--glass-3); border: 1px solid var(--hairline-bold); backdrop-filter: blur(36px); }
  `,
})
export class DrawerComponent {
  @Input() open = true;
}
