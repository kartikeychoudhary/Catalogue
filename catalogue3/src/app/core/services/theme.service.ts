import { Injectable, signal } from '@angular/core';

export type AuroraName = 'dawn' | 'reef' | 'ember' | 'forest';
export type RadiusVariant = 'soft' | 'round' | 'sharp';

const RADIUS_MAP: Record<RadiusVariant, string[]> = {
  soft: ['8px', '12px', '16px', '20px', '28px', '36px'],
  round: ['12px', '18px', '24px', '28px', '36px', '48px'],
  sharp: ['2px', '4px', '6px', '8px', '10px', '14px'],
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly aurora = signal<AuroraName>('dawn');
  readonly radiusVariant = signal<RadiusVariant>('soft');

  setAurora(name: AuroraName): void {
    this.aurora.set(name);
    document.documentElement.dataset['aurora'] = name;
  }

  setRadiusVariant(variant: RadiusVariant): void {
    this.radiusVariant.set(variant);
    const values = RADIUS_MAP[variant];
    [1, 2, 3, 4, 5, 6].forEach((n, i) => {
      document.documentElement.style.setProperty('--r-' + n, values[i]);
    });
  }
}
