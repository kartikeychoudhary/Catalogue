import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toggle.html',
  styleUrl: './toggle.scss',
})
export class ToggleComponent {
  @Input() label = '';
  @Input() checked = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
