import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface ColumnDef {
  key: string;
  label: string;
  numeric?: boolean;
}

export interface SortEvent {
  key: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="tbl-wrap">
    <table class="tbl">
      <thead>
        <tr>
          <th *ngFor="let col of columns" [class.num]="col.numeric">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let col of columns" [class.num]="col.numeric">{{ row[col.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styles: `
    .tbl-wrap { border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1); overflow: hidden; backdrop-filter: blur(28px); }
    .tbl { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 640px; }
    .tbl th, .tbl td { text-align: left; padding: 14px 18px; border-bottom: 1px solid var(--hairline); }
    .tbl th { font-family: var(--mono); font-weight: 500; font-size: 11px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: 0.08em; background: var(--glass-2); }
    .tbl tr:last-child td { border-bottom: 0; }
    .tbl tr:hover td { background: var(--glass-2); }
    .tbl .num { font-family: var(--mono); text-align: right; }
  `,
})
export class TableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: Record<string, string | number>[] = [];
  @Output() sortChanged = new EventEmitter<SortEvent>();
}
