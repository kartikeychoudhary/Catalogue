import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface KeyValueItem {
  key: string;
  value: string;
}

@Component({
  selector: 'app-key-value',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './key-value.html',
  styleUrl: './key-value.scss',
})
export class KeyValueComponent {
  @Input() items: KeyValueItem[] = [];
}
