import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface ColumnDef {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class TableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() rows: Record<string, unknown>[] = [];

  @Output() sort = new EventEmitter<SortEvent>();

  protected currentSort: SortEvent | null = null;

  protected onSort(col: ColumnDef): void {
    if (!col.sortable) {
      return;
    }
    const direction: 'asc' | 'desc' =
      this.currentSort?.column === col.key && this.currentSort?.direction === 'asc'
        ? 'desc'
        : 'asc';
    this.currentSort = { column: col.key, direction };
    this.sort.emit(this.currentSort);
  }

  protected isNum(value: unknown): boolean {
    return typeof value === 'number';
  }
}
