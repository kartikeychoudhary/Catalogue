import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() name = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
