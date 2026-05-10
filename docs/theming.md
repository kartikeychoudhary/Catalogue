# Theming

## Token Taxonomy

### Color tokens
- `--bg`, `--surface`, `--surface-2`: background hierarchy
- `--text`, `--text-muted`, `--text-dim`: text hierarchy
- `--border`, `--border-soft`, `--hairline`: border hierarchy
- `--accent`, `--accent-fg`: primary accent and its foreground color

### Semantic tokens
- `--success`, `--warning`, `--danger`, `--info`

### Glass tokens (C3 only)
- `--glass-1` (alpha 0.06), `--glass-2` (alpha 0.10), `--glass-3` (alpha 0.14), `--glass-strong` (alpha 0.22)
- `--hairline`, `--hairline-bold`, `--hairline-glow`

### Geometry tokens
- `--radius` (C1), `--r-1` through `--r-6` (C3)
- `--bw`, `--bw-thick` (C2)
- `--shadow`, `--shadow-lg`, `--shadow-sm` (C2)
- `--shadow-1`, `--shadow-2`, `--shadow-pop` (C3)

### Spacing tokens
- `--s-1` through `--s-10` (C1/C2), `--bx`, `--pad` (C3)

## How themes work

Data attributes control theming:

1. `[data-theme="light"|"dark"]` — Light/dark mode
2. `[data-palette="<name>"]` — Palette variant (C1: ink/stone/steel, C2: concrete/toxic/riso)
3. `[data-aurora="<name>"]` — Aurora variant (C3: dawn/reef/ember/forest)
4. `[data-radius="soft"|"round"|"sharp"]` — Radius variant (C3 only)

Additionally, `--accent` and `--accent-fg` are set via `document.documentElement.style.setProperty()` at runtime by ThemeService.

## ThemeService API

```typescript
@Injectable({ providedIn: 'root' })
class ThemeService {
  theme: WritableSignal<'light' | 'dark'>;
  accent: WritableSignal<string>;
  accentFg: Signal<string>;                 // computed from luminance
  palette: WritableSignal<string>;          // C1/C2 only
  aurora: WritableSignal<string>;           // C3 only
  radiusVariant: WritableSignal<string>;    // C3 only

  setTheme(t: 'light' | 'dark'): void;
  setAccent(hex: string): void;
  setPalette(p: string): void;
  setAurora(a: string): void;
  setRadiusVariant(r: string): void;
  toggleTheme(): void;
}
```

All setters: update signal, persist to localStorage, update DOM attribute/style.

## _themes.scss Structure

```scss
:root {
  --bg: #fafaf7;
  --text: #0a0a0a;
  // ... all tokens
}

[data-theme="dark"] {
  --bg: #0c0c0a;
  --text: #f4f4ee;
  // ... overrides
}

[data-palette="stone"] {
  --bg: #f5f1ea;
  // ... palette-specific overrides
}

[data-theme="dark"][data-palette="stone"] {
  // ... combined overrides
}
```

## Accent Luminance Computation

```typescript
private computeAccentFg(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0a0a0a' : '#ffffff';
}
```
