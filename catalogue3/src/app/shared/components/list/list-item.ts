import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="list-item"><ng-content></ng-content></div>`,
  styles: `
    .list-item { display: grid; grid-template-columns: 44px 1fr auto auto; gap: 14px; padding: 14px 18px; border-bottom: 1px solid var(--hairline); align-items: center; }
    .list-item:last-child { border-bottom: 0; }
  `,
})
export class ListItemComponent {}
