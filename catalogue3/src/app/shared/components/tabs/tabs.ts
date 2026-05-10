import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface TabItem {
  label: string;
  active?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="tabs">
    <button class="tab" *ngFor="let tab of tabs" [class.-active]="tab.active"
      (click)="tabSelected.emit(tab)">{{ tab.label }}</button>
  </div>`,
  styles: `
    .tabs { display: flex; gap: 4px; padding: 4px; background: var(--glass-2); border: 1px solid var(--hairline); border-radius: 999px; width: fit-content; }
    .tab { padding: 6px 14px; border-radius: 999px; border: 0; background: transparent; color: var(--ink-soft); font-size: 13px; font-weight: 500; cursor: pointer; }
    .tab.-active { background: var(--glass-strong); color: var(--ink); }
  `,
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Output() tabSelected = new EventEmitter<TabItem>();
}
