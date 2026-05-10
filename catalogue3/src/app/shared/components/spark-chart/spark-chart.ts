import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-spark-chart',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="spark">
    <svg viewBox="0 0 200 56" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="white" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path [attr.d]="areaPath" fill="url(#spark-g)"/>
      <path [attr.d]="linePath" fill="none" stroke="white" stroke-width="1.5"/>
    </svg>
  </div>`,
  styles: `
    .spark { height: 56px; border-radius: var(--r-2); background: linear-gradient(180deg, color-mix(in oklab, var(--accent) 30%, transparent), transparent); position: relative; overflow: hidden; }
    .spark svg { width: 100%; height: 100%; }
  `,
})
export class SparkChartComponent {
  @Input() data: number[] = [40, 30, 18, 22, 26, 40, 32, 24, 8, 14];

  get linePath(): string {
    return this.buildPath(false);
  }

  get areaPath(): string {
    return this.buildPath(true);
  }

  private buildPath(area: boolean): string {
    const h = 56;
    const step = 200 / (this.data.length - 1);
    const points = this.data.map((v, i) => `${i * step},${h - (v / Math.max(...this.data, 1)) * h}`);
    const d = `M${points.join(' C')}`;
    if (area) return `${d} L200,${h} L0,${h} Z`;
    return d;
  }
}
