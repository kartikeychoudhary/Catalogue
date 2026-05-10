import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { IconRegistryService } from '@core/services/icon-registry.service';
import type { IconName, IconSize } from './icon.types';

@Component({
  selector: 'app-icon',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class IconComponent {
  private registry = inject(IconRegistryService);

  @Input({ required: true }) name!: IconName;
  @Input() size: IconSize | number = 'md';
  @Input() ariaLabel?: string;

  private readonly sizeMap: Record<IconSize, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  get pixelSize(): number {
    return typeof this.size === 'number' ? this.size : this.sizeMap[this.size];
  }

  get href(): string {
    return this.registry.resolve(this.name);
  }
}
