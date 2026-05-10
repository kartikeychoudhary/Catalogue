import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService, AuroraName, RadiusVariant } from '@core/services/theme.service';

const AURORA_OPTIONS: { value: AuroraName; c1: string; c2: string; c3: string }[] = [
  { value: 'dawn', c1: '#ff5fb3', c2: '#6e5cff', c3: '#2dd4ff' },
  { value: 'reef', c1: '#00e1c4', c2: '#2c5cff', c3: '#b54bff' },
  { value: 'ember', c1: '#ff7a4c', c2: '#ff3d77', c3: '#ffd166' },
  { value: 'forest', c1: '#4ad991', c2: '#00b4a4', c3: '#6e5cff' },
];

@Component({
  selector: 'app-theme-controls',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './theme-controls.html',
  styleUrl: './theme-controls.scss',
})
export class ThemeControlsComponent {
  private readonly themeService = inject(ThemeService);

  open = false;
  themeMode: 'dark' | 'light' = 'dark';
  selectedAurora = this.themeService.aurora.asReadonly();
  selectedRadius = this.themeService.radiusVariant.asReadonly();
  auroraOptions = AURORA_OPTIONS;

  togglePanel(): void {
    this.open = !this.open;
  }

  setTheme(mode: 'dark' | 'light'): void {
    this.themeMode = mode;
    document.documentElement.dataset['theme'] = mode;
  }

  setAurora(name: AuroraName): void {
    this.themeService.setAurora(name);
  }

  setRadius(variant: RadiusVariant): void {
    this.themeService.setRadiusVariant(variant);
  }
}
