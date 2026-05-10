import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

interface RadioOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-radio-group',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
})
export class RadioGroupComponent {
  @Input() name = '';
  @Input() options: RadioOption[] = [];
  @Input() value = '';

  @Output() valueChange = new EventEmitter<string>();

  onSelect(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
