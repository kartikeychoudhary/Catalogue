import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-media',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-media.html',
  styleUrl: './card-media.scss',
})
export class CardMediaComponent {
  @Input() imageAlt = '';
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() description = '';
  @Input() metaLabel = '';
  @Input() metaValue = '';
}
