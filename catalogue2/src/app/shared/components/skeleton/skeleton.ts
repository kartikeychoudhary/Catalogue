import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export type SkeletonVariant = 'text' | 'tall' | 'img';

@Component({
  selector: 'app-skeleton',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
})
export class SkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width = '100%';
}
