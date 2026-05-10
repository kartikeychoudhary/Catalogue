import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import type { BadgeVariant } from '../badge/badge';

@Component({
  selector: 'app-list-item',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
})
export class ListItemComponent {
  @Input() icon = '';
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() badgeLabel?: string;
  @Input() badgeVariant: BadgeVariant = 'neutral';
}
