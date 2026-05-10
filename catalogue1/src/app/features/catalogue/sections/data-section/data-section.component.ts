import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { ColumnDef } from '@shared/components/table/table';
import type { KeyValueItem } from '@shared/components/key-value/key-value';

@Component({
  selector: 'app-data-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './data-section.component.html',
  styleUrl: './data-section.component.scss',
})
export class DataSectionComponent {
  readonly columns: ColumnDef[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'since', label: 'Since' },
  ];

  readonly rows: Record<string, unknown>[] = [
    { name: 'Hans Wilsdorf', role: 'Founder', status: 'Active', since: '1905' },
    { name: 'Max Büsser', role: 'Designer', status: 'Active', since: '2005' },
    { name: 'Gérald Genta', role: 'Designer', status: 'Inactive', since: '1969' },
    { name: 'Abraham-Louis Breguet', role: 'Watchmaker', status: 'Legacy', since: '1775' },
  ];

  readonly kvItems: KeyValueItem[] = [
    { key: 'Brand', value: 'Catalogue nº 01' },
    { key: 'Version', value: '2.0.0' },
    { key: 'Framework', value: 'Angular 21' },
    { key: 'Design', value: 'Swiss Editorial' },
  ];

  readonly avatars = ['HW', 'MB', 'GG', 'AB'];
}
