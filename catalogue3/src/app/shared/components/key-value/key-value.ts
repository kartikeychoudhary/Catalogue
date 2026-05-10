import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface KeyValueItem {
  key: string;
  value: string;
}

@Component({
  selector: 'app-key-value',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<dl class="kv">
    <div class="row" *ngFor="let item of items">
      <dt>{{ item.key }}</dt><dd>{{ item.value }}</dd>
    </div>
  </dl>`,
  styles: `
    .kv { border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); overflow: hidden; padding: 4px 0; margin: 0; }
    .kv .row { display: grid; grid-template-columns: 130px 1fr; padding: 10px 16px; gap: 12px; }
    .kv dt { font-size: 12px; color: var(--ink-mute); margin: 0; }
    .kv dd { font-size: 14px; font-weight: 500; margin: 0; }
  `,
})
export class KeyValueComponent {
  @Input() items: KeyValueItem[] = [];
}
