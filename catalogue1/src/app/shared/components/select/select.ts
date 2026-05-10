import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class SelectComponent {
  @Input() label = '';
  @Input() options: SelectOption[] = [];
  @Input() multiple = false;
  @Input() size?: number;
  @Input() value = '';
  @Input() disabled = false;
}
