# Pixel-Perfect Checklist

Per-catalogue verification against source HTML in `Catalogue/`.

## General verification workflow

1. Open source HTML in browser at 1440px, 1024px, 768px, 360px
2. Run `npm start` and open Angular catalogue route in another tab
3. Verify side-by-side: same layout, same spacing, same colors, same typography
4. Toggle dark mode, change palette/accent in both — verify parity
5. Log any unavoidable deviation below with justification

## Catalogue 1 — Swiss Editorial

### Tokens
- [ ] `:root` tokens from HTML lines 12-59 copied verbatim to `_themes.scss`
- [ ] `[data-palette="stone"]` block (lines 62-72) copied verbatim
- [ ] `[data-palette="steel"]` block (lines 74-84) copied verbatim
- [ ] `[data-theme="dark"]` block (lines 87-101) copied verbatim
- [ ] `[data-theme="dark"][data-palette="stone"]` (lines 102-106) copied verbatim
- [ ] `[data-theme="dark"][data-palette="steel"]` (lines 107-111) copied verbatim
- [ ] Spacing scale (4,8,12,16,24,32,48,64,96,128) matches
- [ ] Radius = 0px throughout

### Fonts
- [ ] Fraunces, Inter, JetBrains Mono loaded via Google Fonts link in index.html
- [ ] Font stacks match: `--serif`, `--sans`, `--mono`

### Visual verification (per breakpoint, theme, palette)

| Section | 360px | 768px | 1024px | 1440px | Dark | Stone | Steel |
|---|---|---|---|---|---|---|---|
| Identity Header | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Color System | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Typography | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Buttons | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Form Controls | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Cards & Surfaces | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Navigation | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Data Display | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Feedback & Overlays | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Layout Patterns | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### Accent presets
- [ ] Hot Red #d6231a, Marine #0e6efd, Forest #1f6f3f, Amber #e08a00, Violet #5b3ad6, Ink #0a0a0a
- [ ] Custom hex input works and validates

### Deviations
_(Log any unavoidable differences here with justification)_

---

## Catalogue 2 — Neo-Brutalist

### Tokens
- [ ] `:root` tokens from HTML lines 11-41 copied verbatim
- [ ] `[data-palette="toxic"]` (lines 42-45) copied verbatim
- [ ] `[data-palette="riso"]` (lines 46-49) copied verbatim
- [ ] `[data-theme="dark"]` (lines 50-54) copied verbatim
- [ ] Combined dark+palette blocks (lines 55-56) copied verbatim
- [ ] Shadow tokens: --shadow (6px 6px 0), --shadow-lg (10px 10px 0), --shadow-sm (3px 3px 0)
- [ ] Border tokens: --bw (3px), --bw-thick (5px)

### Visual verification

| Section | 360px | 768px | 1024px | 1440px | Dark | Toxic | Riso |
|---|---|---|---|---|---|---|---|
| Identity Header | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Color System | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Typography | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Buttons | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Form Controls | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Cards & Surfaces | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Navigation | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Data Display | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Feedback & Overlays | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Layout Patterns | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### Deviations
_(Log any unavoidable differences here with justification)_

---

## Catalogue 3 — Glassmorphic Spatial

### Tokens
- [ ] `:root` tokens from HTML lines 11-55 copied verbatim
- [ ] `[data-aurora="reef"]` (lines 56-63) copied verbatim
- [ ] `[data-aurora="ember"]` (lines 64-71) copied verbatim
- [ ] `[data-aurora="forest"]` (lines 72-79) copied verbatim
- [ ] `[data-theme="light"]` (lines 81-97) copied verbatim
- [ ] Glass tokens: --glass-1 through --glass-strong
- [ ] Shadow tokens: --shadow-1, --shadow-2, --shadow-pop
- [ ] Radius scale: --r-1 through --r-6

### Visual verification

| Section | 360px | 768px | 1024px | 1440px | Light | Reef | Ember | Forest | Soft | Round | Sharp |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Identity Hero | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Color & Ambience | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Typography | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Buttons | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Form Controls | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Cards & Surfaces | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Navigation | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Data Display | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Feedback & Overlays | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |
| Layout Patterns | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### Deviations
_(Log any unavoidable differences here with justification)_
