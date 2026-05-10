import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="list"><ng-content></ng-content></div>`,
  styles: `
    .list { border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); overflow: hidden; }
  `,
})
export class ListComponent {}
