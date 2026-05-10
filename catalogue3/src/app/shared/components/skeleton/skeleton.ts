import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export type SkeletonVariant = 'text' | 'tall' | 'img';

@Component({
  selector: 'app-skeleton',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="skel" [class.-tall]="variant === 'tall'" [class.-img]="variant === 'img'"></div>`,
  styles: `
    .skel { background: linear-gradient(90deg, var(--glass-1), var(--glass-3), var(--glass-1)); background-size: 200% 100%; animation: shimmer 1.6s linear infinite; height: 14px; border-radius: 8px; }
    @keyframes shimmer { from { background-position: 0 0; } to { background-position: -200% 0; } }
    .skel.-tall { height: 28px; }
    .skel.-img { height: 120px; border-radius: var(--r-3); }
  `,
})
export class SkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
}
