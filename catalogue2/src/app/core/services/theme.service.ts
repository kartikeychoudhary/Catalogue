import { Injectable, signal, computed } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type PaletteName = 'concrete' | 'toxic' | 'riso';

const STORAGE_KEYS = {
  theme: 'c2-theme',
  palette: 'c2-palette',
  accent: 'c2-accent',
  accent2: 'c2-accent2',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme = signal<ThemeMode>(this.loadTheme());
  palette = signal<PaletteName>(this.loadPalette());
  accent = signal<string>(this.loadAccent());
  accent2 = signal<string>(this.loadAccent2());

  accentFg = computed(() => this.computeAccentFg(this.accent()));
  accent2Fg = computed(() => this.computeAccentFg(this.accent2()));

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

  setAccent2(hex: string): void {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    this.accent2.set(hex);
    localStorage.setItem(STORAGE_KEYS.accent2, hex);
    this.applyAccent2();
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private applyAll(): void {
    this.applyTheme();
    this.applyPalette();
    this.applyAccent();
    this.applyAccent2();
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

  private applyAccent2(): void {
    document.documentElement.style.setProperty('--accent-2', this.accent2());
  }

  private computeAccentFg(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return lum > 0.6 ? '#050505' : '#ffffff';
  }

  private loadTheme(): ThemeMode {
    return (localStorage.getItem(STORAGE_KEYS.theme) as ThemeMode) ?? 'light';
  }

  private loadPalette(): PaletteName {
    return (localStorage.getItem(STORAGE_KEYS.palette) as PaletteName) ?? 'concrete';
  }

  private loadAccent(): string {
    return localStorage.getItem(STORAGE_KEYS.accent) ?? '#ffd400';
  }

  private loadAccent2(): string {
    return localStorage.getItem(STORAGE_KEYS.accent2) ?? '#ff5af0';
  }
}
