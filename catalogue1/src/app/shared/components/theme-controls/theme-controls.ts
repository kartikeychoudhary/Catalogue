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
    { hex: '#d6231a', label: 'Hot Red' },
    { hex: '#0e6efd', label: 'Marine' },
    { hex: '#1f6f3f', label: 'Forest' },
    { hex: '#e08a00', label: 'Amber' },
    { hex: '#5b3ad6', label: 'Violet' },
    { hex: '#0a0a0a', label: 'Ink' },
  ];

  readonly PALETTES: PaletteName[] = ['ink', 'stone', 'steel'];

  get currentTheme() { return this.themeService.theme(); }
  get currentPalette() { return this.themeService.palette(); }
  get currentAccent() { return this.themeService.accent(); }

  togglePanel(): void { this.open.update(v => !v); }
  setTheme(t: 'light' | 'dark'): void { this.themeService.setTheme(t); }
  setPalette(p: PaletteName): void { this.themeService.setPalette(p); }
  setAccent(hex: string): void { this.themeService.setAccent(hex); }
  onHexInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setAccent(input.value);
  }
}
