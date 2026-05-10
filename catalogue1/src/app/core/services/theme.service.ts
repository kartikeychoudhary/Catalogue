import { Injectable, signal, computed } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type PaletteName = 'ink' | 'stone' | 'steel';

const STORAGE_KEYS = {
  theme: 'c1-theme',
  palette: 'c1-palette',
  accent: 'c1-accent',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<ThemeMode>(this.loadTheme());
  palette = signal<PaletteName>(this.loadPalette());
  accent = signal<string>(this.loadAccent());

  accentFg = computed(() => this.computeAccentFg(this.accent()));

  constructor() {
    this.applyAll();
  }

  setTheme(t: ThemeMode): void {
    this.theme.set(t);
    localStorage.setItem(STORAGE_KEYS.theme, t);
    this.applyTheme();
  }

  setPalette(p: PaletteName): void {
    this.palette.set(p);
    localStorage.setItem(STORAGE_KEYS.palette, p);
    this.applyPalette();
  }

  setAccent(hex: string): void {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    this.accent.set(hex);
    localStorage.setItem(STORAGE_KEYS.accent, hex);
    this.applyAccent();
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private applyAll(): void {
    this.applyTheme();
    this.applyPalette();
    this.applyAccent();
  }

  private applyTheme(): void {
    document.documentElement.dataset['theme'] = this.theme();
  }

  private applyPalette(): void {
    document.documentElement.dataset['palette'] = this.palette();
  }

  private applyAccent(): void {
    document.documentElement.style.setProperty('--accent', this.accent());
    document.documentElement.style.setProperty('--accent-fg', this.accentFg());
  }

  private computeAccentFg(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.6 ? '#0a0a0a' : '#ffffff';
  }

  private loadTheme(): ThemeMode {
    return (localStorage.getItem(STORAGE_KEYS.theme) as ThemeMode) ?? 'light';
  }

  private loadPalette(): PaletteName {
    return (localStorage.getItem(STORAGE_KEYS.palette) as PaletteName) ?? 'ink';
  }

  private loadAccent(): string {
    return localStorage.getItem(STORAGE_KEYS.accent) ?? '#d6231a';
  }
}
