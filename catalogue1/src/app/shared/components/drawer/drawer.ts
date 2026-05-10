import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
})
export class DrawerComponent {
  @Input() open = false;
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
}
