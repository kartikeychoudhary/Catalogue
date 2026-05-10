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
  tableColumns: ColumnDef[] = [
    { key: 'track', label: 'TRACK ↓', sortable: true },
    { key: 'album', label: 'ALBUM' },
    { key: 'status', label: 'STATUS' },
    { key: 'plays', label: 'PLAYS' },
    { key: 'updated', label: 'UPDATED' },
  ];

  tableRows: Record<string, unknown>[] = [
    { track: 'BARRIER METAL', album: 'SHEET METAL HEAVEN', status: '● MASTERED', plays: 182440, updated: 'MAY 02' },
    { track: 'WAREHOUSE BREATH', album: 'SHEET METAL HEAVEN', status: '● MIXING', plays: 4210, updated: 'MAY 07' },
    { track: 'VOLUME II', album: 'FIRST PRESS', status: '● LIVE', plays: 1200000, updated: 'APR 19' },
    { track: 'OFF-CYCLE B-SIDE', album: '—', status: '● DEMO', plays: 0, updated: 'MAY 08' },
    { track: 'SOFT EDGE', album: 'SHEET METAL HEAVEN', status: '● SCRAPPED', plays: '—', updated: 'MAY 09' },
  ];

  kvItems: KeyValueItem[] = [
    { key: 'RELEASE', value: '13 JUN 2026' },
    { key: 'FORMAT', value: 'VINYL · TAPE · DIGITAL' },
    { key: 'RUNTIME', value: '13:42' },
    { key: 'LABEL', value: 'HARD SHOULDER REC.' },
  ];
}
