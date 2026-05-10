import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-progress',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class ProgressComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() label?: string;

  get percentage(): number {
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }
}
