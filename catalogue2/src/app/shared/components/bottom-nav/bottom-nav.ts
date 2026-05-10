import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface BottomNavItem {
  label: string;
  active?: boolean;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNavComponent {
  @Input() items: BottomNavItem[] = [];

  @Output() itemClick = new EventEmitter<string>();
}
