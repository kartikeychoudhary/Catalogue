import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ThemeService, type PaletteName } from '@core/services/theme.service';

@Component({
  selector: 'app-theme-controls',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './theme-controls.html',
  styleUrl: './theme-controls.scss',
})
export class ThemeControlsComponent {
  private themeService = inject(ThemeService);
  open = signal(false);

  readonly ACCENTS = [
    { hex: '#ffd400', label: 'Yellow' },
    { hex: '#ff5af0', label: 'Pink' },
    { hex: '#00ffd5', label: 'Teal' },
    { hex: '#ff3a3a', label: 'Red' },
    { hex: '#2c5cff', label: 'Blue' },
    { hex: '#1ea654', label: 'Green' },
  ];

  readonly PALETTES: PaletteName[] = ['concrete', 'toxic', 'riso'];

  get currentTheme() { return this.themeService.theme(); }
  get currentPalette() { return this.themeService.palette(); }
  get currentAccent() { return this.themeService.accent(); }
  get currentAccent2() { return this.themeService.accent2(); }

  togglePanel(): void { this.open.update(v => !v); }
  setTheme(t: 'light' | 'dark'): void { this.themeService.setTheme(t); }
  setPalette(p: PaletteName): void { this.themeService.setPalette(p); }
  setAccent(hex: string): void { this.themeService.setAccent(hex); }
  setAccent2(hex: string): void { this.themeService.setAccent2(hex); }
  onHexInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setAccent(input.value);
  }
}
