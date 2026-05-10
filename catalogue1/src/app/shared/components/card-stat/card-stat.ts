import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-stat',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-stat.html',
  styleUrl: './card-stat.scss',
})
export class CardStatComponent {
  @Input() eyebrow = '';
  @Input() value = '';
  @Input() delta = '';
  @Input() deltaDirection: 'up' | 'down' = 'up';
  @Input() caption = '';
}
