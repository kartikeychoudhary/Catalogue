# Three-Catalogue Angular Workspace — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build three independent Angular 19 production-grade component libraries (Swiss Editorial, Neo-Brutalist, Glassmorphic Spatial), each pixel-perfect to its source HTML catalogue.

**Architecture:** Three independent Angular CLI projects with identical module structure (Core/Shared/Features/Layouts), shared conventions (NgModule-only, OnPush, CSS custom properties), but completely independent visual tokens and component styling. Each project renders a catalogue demo page at `/` reproducing its source HTML pixel-for-pixel.

**Tech Stack:** Angular 19.x, NgModule, TypeScript strict, SCSS, Reactive Forms, RxJS + Signals, Vitest, ESLint + Prettier

**Note on scope:** The three catalogues are independent subsystems. Each could be its own implementation plan. This document covers all three as phases, with Phase 1 (workspace) + Phase 2 (C1) in full detail. Phases 3-4 (C2, C3) reference the C1 pattern and focus on differences.

---

## Phase 1: Workspace Scaffolding + Shared Docs

### Task 1.1: Create root CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

- [ ] **Step 1: Write CLAUDE.md**

Write the exact content from the user prompt's CLAUDE.md spec at workspace root.

```markdown
# Workspace: Angular Catalogue Starters

## What this is
Three independent Angular 19 starter projects, one per design catalogue
(catalogue1/, catalogue2/, catalogue3/). Each is a pluggable component
library plus a working demo route. They share architecture, not visuals.

## Stack (all three projects)
- Angular 19.x, NgModule-based (standalone: false everywhere)
- TypeScript strict, SCSS, Reactive Forms only
- ChangeDetectionStrategy.OnPush on every component
- Vitest for tests, ESLint + Prettier
- Path aliases: @core, @shared, @features, @layouts, @theme

## Hard rules — never violate
1. No standalone components/directives/pipes. Everything in NgModules.
2. OnPush on every component.
3. No hardcoded colors/spacing/radii in components — use CSS custom properties.
4. shared/* has no business logic, no HTTP, no router injection.
5. CoreModule imported once (in AppModule); throws on re-import.
6. SharedModule has zero providers.
7. No `any`. Strict TS only.
8. Use path aliases for cross-folder imports.
9. Components in shared/ are pure, pluggable, accept inputs, emit outputs.
10. Accessibility required: focus rings, ARIA, keyboard nav.

## Directory map (per project)
[full tree]

## Commands (run inside catalogueN/)
- npm install
- npm start            → ng serve
- npm test             → vitest run
- npm run lint
- npm run build
- ng g c shared/components/<name>   → generates non-standalone OnPush component

## Recipes
### Add a new component
1. ng g c shared/components/<name>
2. Define typed @Input()/@Output() in component class
3. Add SCSS using only var(--token) for themeable values
4. Add to SharedModule declarations + exports
5. Add to shared/components/index.ts barrel
6. Write spec covering: renders, inputs reflect to template, outputs fire, a11y basics
7. Add a usage example in features/catalogue/sections/<relevant-section>

### Add a new icon
1. Open public/icons/sprite.svg
2. Add <symbol id="icon-<name>" viewBox="0 0 24 24">...</symbol>
3. Add '<name>' to IconName union in shared/components/icon/icon.types.ts
4. Use anywhere as <app-icon name="<name>" size="md" />

### Add a new theme/palette
1. Open src/styles/_themes.scss
2. Add a new [data-palette="<name>"] block defining all palette tokens
3. Register the palette name in core/services/theme.service.ts PaletteName union

## Common mistakes (do not make these)
- Generating standalone components by accident (check angular.json schematics)
- Forgetting changeDetection: OnPush
- Importing SharedModule into CoreModule, or vice versa
- Subscribing to Observables in components instead of using async pipe
- Hardcoding hex values in component SCSS instead of using var(--token)
- Adding providers to SharedModule
- Putting business logic in shared/components

## Per-project notes
- catalogue1/  Swiss Editorial — strict grid, serif+grotesque, single-accent monochrome
- catalogue2/  Neo-Brutalist — thick borders, hard shadows, uppercase, loud
- catalogue3/  Glassmorphic Spatial — translucent layers, blur, gradient meshes, depth
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add root CLAUDE.md with workspace conventions"
```

### Task 1.2: Create root README.md

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README.md**

```markdown
# Angular Catalogue Starters

Three production-grade Angular 19 starter projects, each derived from a complete
HTML design catalogue. Every project is a pluggable component library plus a
working demo route that reproduces the source HTML pixel-for-pixel.

## Projects

| # | Name | Style | Fonts | Signature |
|---|---|---|---|---|
| 1 | Swiss Editorial | Strict grid, serif+grotesque, single hot accent | Fraunces + Inter | 0px radius, 1px rules |
| 2 | Neo-Brutalist | Thick borders, hard shadows, uppercase | Space Grotesk | 3px borders + 6px/6px shadows |
| 3 | Glassmorphic Spatial | Translucent layers, blur, gradients | Plus Jakarta Sans | backdrop-filter + aurora gradients |

## Quick Start

```bash
cd catalogue1   # or catalogue2, catalogue3
npm install
npm start       # opens http://localhost:4200 — the catalogue demo page
```

## Structure

```
catalogueN/
├── src/app/
│   ├── core/          # Singletons: ThemeService, IconRegistryService
│   ├── shared/        # Pure presentational components + SharedModule
│   ├── features/      # Lazy-loaded features (catalogue demo at /)
│   └── layouts/       # MainLayoutComponent (theme controls host)
└── public/icons/      # sprite.svg icon set
```

## Conventions

- All components: NgModule, OnPush, CSS custom properties for styling
- Path aliases: `@core`, `@shared`, `@features`, `@layouts`, `@theme`
- SharedModule: zero providers, re-exports all shared components
- CoreModule: imported once, contains all singletons
```

### Task 1.3: Create docs/ files

**Files:**
- Create: `docs/architecture.md`
- Create: `docs/component-conventions.md`
- Create: `docs/theming.md`
- Create: `docs/icon-system.md`
- Create: `docs/adding-a-component.md`
- Create: `docs/adding-an-icon.md`
- Create: `docs/pixel-perfect-checklist.md`
- Create: `docs/catalogue-mapping.md`

- [ ] **Step 1: Write docs/architecture.md**

Module boundaries, dependency direction, where state lives, why NgModules + OnPush.

```markdown
# Architecture

## Module Boundaries

```
features → shared → core (never reversed)
  ↓
layouts (wraps features)
```

- **CoreModule:** Singleton services (ThemeService, IconRegistryService, BreakpointService).
  Imported once in AppModule. Throws in constructor if imported a second time.
- **SharedModule:** Pure presentational components, directives, pipes. Zero providers.
  Re-exports CommonModule and ReactiveFormsModule. No HTTP, no router injection.
- **Feature modules:** Lazy-loaded via routing. Import SharedModule. Contain business
  logic, page components, and section compositions.
- **Layouts:** Wraps router-outlet. Hosts theme controls and chrome.

## Dependency Rules

1. `shared/` components never import from `core/`, `features/`, or `layouts/`
2. `core/` services never import from `features/` or `layouts/`
3. Feature modules import `SharedModule` (components) and inject `CoreModule` services
4. Layout modules import `SharedModule` and inject `CoreModule` services
5. Cross-folder imports use path aliases (`@shared/...`, `@core/...`)

## State Management

- **Theme state:** ThemeService (signals + localStorage persistence)
- **Component state:** @Input/@Output for parent-child; Signals for local state
- **Template state:** async pipe for Observables; never manual .subscribe() + assign
- **No global state store (NgRx, etc.)** — not needed for a component library

## Why NgModules + OnPush

- NgModule provides explicit dependency boundaries and prevents accidental standalone
  mixing
- OnPush ensures components only re-render when inputs change, improving performance
  and enforcing immutable data patterns
```

- [ ] **Step 2: Write docs/component-conventions.md**

```markdown
# Component Conventions

## File Layout

```
shared/components/<name>/
├── <name>.component.ts
├── <name>.component.html
├── <name>.component.scss
├── <name>.component.spec.ts
├── <name>.types.ts          # Only if the component has non-trivial types
└── index.ts                 # Barrel re-export
```

## Naming

- Component selector: `app-<name>` (e.g., `app-button`, `app-card`)
- Component class: `<Name>Component` (e.g., `ButtonComponent`)
- Module class: `<Name>Module` (e.g., `SharedModule`)
- Service class: `<Name>Service` (e.g., `ThemeService`)

## Input/Output API Style

- Required inputs use `@Input({ required: true })`
- Boolean inputs use `@Input() loading = false` (not `@Input('appLoading')`)
- Outputs use `@Output() clicked = new EventEmitter<void>()` (not `onClick`)
- Type unions for constrained values: `@Input() size: 'sm' | 'md' | 'lg' = 'md'`
- Types file when a component has >3 type unions or shared interfaces

## Content Projection

- Base cards use slot-based `<ng-content>`:

```html
<!-- CardComponent template -->
<div class="card">
  <ng-content select="[card-header]"></ng-content>
  <ng-content></ng-content>                          <!-- body -->
  <ng-content select="[card-footer]"></ng-content>
</div>
```

- Complex compositions use specialized wrappers that project into base:
  `PricingCardComponent` composes `CardComponent` internally.

## Accessibility Checklist

Every interactive component must:
1. Be keyboard navigable (Tab, Enter, Escape, arrows where applicable)
2. Have visible `:focus-visible` ring
3. Use `aria-label` on icon-only elements
4. Use semantic HTML (`<button>`, not `<div onclick>`)
5. Modals trap focus and restore on close
6. Toasts use `role="status"` or `role="alert"`
7. Form controls have associated `<label>` elements
```

- [ ] **Step 3: Write docs/theming.md**

```markdown
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
- `--glass-1` (α0.06), `--glass-2` (α0.10), `--glass-3` (α0.14), `--glass-strong` (α0.22)
- `--hairline`, `--hairline-bold`, `--hairline-glow`

### Geometry tokens
- `--radius` (C1), `--r-1` through `--r-6` (C3)
- `--bw`, `--bw-thick` (C2)
- `--shadow`, `--shadow-lg`, `--shadow-sm` (C2)
- `--shadow-1`, `--shadow-2`, `--shadow-pop` (C3)

### Spacing tokens
- `--s-1` through `--s-10` (C1/C2), `--bx`, `--pad` (C3)

## How themes work

Three CSS data attributes control theming:

1. `[data-theme="light"|"dark"]` — Light/dark mode
2. `[data-palette="<name>"]` — Palette variant (C1: ink/stone/steel, C2: concrete/toxic/riso)
3. `[data-aurora="<name>"]` — Aurora variant (C3: dawn/reef/ember/forest)
4. `[data-radius="soft"|"round"|"sharp"]` — Radius variant (C3 only)

Additionally, `--accent` and `--accent-fg` are set via `document.documentElement.style.setProperty()`
at runtime by ThemeService.

## ThemeService API

```typescript
@Injectable({ providedIn: 'root' })
class ThemeService {
  theme: WritableSignal<'light' | 'dark'>;
  accent: WritableSignal<string>;           // hex, e.g. '#d6231a'
  accentFg: Signal<string>;                 // computed from luminance
  palette: WritableSignal<string>;          // C1/C2
  aurora: WritableSignal<string>;           // C3
  radiusVariant: WritableSignal<string>;    // C3

  setTheme(t: 'light' | 'dark'): void;
  setAccent(hex: string): void;             // validates hex, computes accentFg
  setPalette(p: string): void;
  setAurora(a: string): void;
  setRadiusVariant(r: string): void;
  toggleTheme(): void;
}
```

All setters:
1. Update the signal
2. Persist to localStorage
3. Update `document.documentElement.dataset` or `.style.setProperty()`

## _themes.scss structure

```scss
:root {
  // Light theme + default palette tokens
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
  --bg: #14110b;
  // ... combined theme+palette overrides
}
```

## Accent computation

```typescript
private computeAccentFg(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0a0a0a' : '#ffffff';   // C1
  // return lum > 0.6 ? '#050505' : '#ffffff';  // C2
}
```
```

- [ ] **Step 4: Write docs/icon-system.md**

```markdown
# Icon System

## Architecture

Single `<app-icon>` component backed by one inline SVG sprite.

### Why sprite over per-icon components?
- Single HTTP request for all icons
- Inline sprite avoids CORS issues with `currentColor`/`stroke`
- Browser caches the sprite; icons render as `<use href="#icon-{name}">`

## sprite.svg format

```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-check" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </symbol>
</svg>
```

## IconRegistryService

```typescript
@Injectable({ providedIn: 'root' })
class IconRegistryService {
  private readonly spritePath = 'icons/sprite.svg';
  private loaded = false;

  constructor(@Inject(DOCUMENT) private doc: Document, private http: HttpClient) {}

  load(): Observable<void> {
    if (this.loaded) return of(undefined);
    return this.http.get(this.spritePath, { responseType: 'text' }).pipe(
      tap(svg => {
        const div = this.doc.createElement('div');
        div.style.display = 'none';
        div.innerHTML = svg;
        this.doc.body.appendChild(div);
        this.loaded = true;
      })
    );
  }

  resolve(name: IconName): string {
    return `#icon-${name}`;
  }
}
```

Sprite is loaded via `APP_INITIALIZER` in CoreModule:

```typescript
{
  provide: APP_INITIALIZER,
  useFactory: (registry: IconRegistryService) => () => firstValueFrom(registry.load()),
  deps: [IconRegistryService],
  multi: true,
}
```

## IconComponent

```typescript
@Component({
  selector: 'app-icon',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="pixelSize" [attr.height]="pixelSize"
         [attr.aria-hidden]="!ariaLabel || null"
         [attr.role]="ariaLabel ? 'img' : null"
         [attr.aria-label]="ariaLabel || null">
      <use [attr.href]="href"></use>
    </svg>
  `,
  styles: [':host { display: inline-flex; align-items: center; }']
})
class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size: IconSize = 'md';
  @Input() ariaLabel?: string;

  private sizeMap: Record<IconSize, number> = {
    xs: 12, sm: 16, md: 20, lg: 24, xl: 32
  };

  get pixelSize(): number {
    return typeof this.size === 'number' ? this.size : this.sizeMap[this.size];
  }

  get href(): string {
    return this.registry.resolve(this.name);
  }
}
```

## IconName union

```typescript
// shared/components/icon/icon.types.ts
export type IconName =
  | 'check'
  | 'close'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'chevron-up'
  | 'search'
  | 'settings'
  | 'heart'
  | 'star'
  | 'plus'
  | 'minus'
  | 'play'
  | 'pause'
  | 'skip-forward'
  | 'skip-back'
  | 'info'
  | 'alert-triangle'
  | 'alert-circle'
  | 'check-circle';
```

Update this union every time you add a symbol to sprite.svg.
```

- [ ] **Step 5: Write docs/adding-a-component.md**

Recipe with concrete example (ButtonComponent).

- [ ] **Step 6: Write docs/adding-an-icon.md**

Recipe with concrete example.

- [ ] **Step 7: Write docs/pixel-perfect-checklist.md**

Per-catalogue verification checklist with rows for each breakpoint/theme/palette combination.

- [ ] **Step 8: Write docs/catalogue-mapping.md**

Table mapping each HTML section → Angular component(s) for all three catalogues.

### Task 1.4: Verify workspace setup

- [ ] **Step 1: Run git status**

```bash
git status
```
Expected: Shows new files in root and docs/.

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md README.md docs/
git commit -m "docs: add workspace scaffolding, CLAUDE.md, and all documentation"
```

---

## Phase 2: Catalogue 1 — Swiss Editorial Minimal

### Task 2.1: Generate Angular project scaffold

**Files:**
- Create: `catalogue1/` (entire Angular CLI project)

- [ ] **Step 1: Generate the project**

```bash
cd /Users/kartikey/github/catalogue_new
npx @angular/cli new catalogue1 --no-standalone --style=scss --routing --strict --skip-tests=false --package-manager=npm --skip-git
```

- [ ] **Step 2: Configure angular.json schematics**

After generation, update `catalogue1/angular.json` to include:

```json
"schematics": {
  "@schematics/angular:component": {
    "standalone": false,
    "changeDetection": "OnPush",
    "style": "scss",
    "displayBlock": true
  },
  "@schematics/angular:directive": { "standalone": false },
  "@schematics/angular:pipe": { "standalone": false }
}
```

- [ ] **Step 3: Install additional dependencies**

```bash
cd catalogue1
npm install
```

- [ ] **Step 4: Configure path aliases in tsconfig.json**

Add to `tsconfig.json` → `compilerOptions.paths`:

```json
{
  "@core/*": ["src/app/core/*"],
  "@shared/*": ["src/app/shared/*"],
  "@features/*": ["src/app/features/*"],
  "@layouts/*": ["src/app/layouts/*"],
  "@theme/*": ["src/styles/*"]
}
```

- [ ] **Step 5: Verify clean build**

```bash
cd catalogue1 && npm run build
```
Expected: Production build succeeds with zero warnings.

### Task 2.2: Extract design tokens from C1 HTML

**Files:**
- Create: `catalogue1/src/styles/_tokens.scss`
- Create: `catalogue1/src/styles/_themes.scss`
- Create: `catalogue1/src/styles/_typography.scss`
- Create: `catalogue1/src/styles/_reset.scss`
- Create: `catalogue1/src/styles/_utilities.scss`
- Create: `catalogue1/src/styles/_mixins.scss`
- Modify: `catalogue1/src/styles.scss`

- [ ] **Step 1: Write _themes.scss**

Copy every CSS custom property verbatim from `Catalogue/catalogue-01-swiss-editorial.html` lines 12-111:

```scss
// _themes.scss — Swiss Editorial tokens (verbatim from source HTML)

:root {
  --serif: "Fraunces", "GT Sectra", "Times New Roman", serif;
  --sans: "Inter", "Neue Haas Grotesk", -apple-system, system-ui, sans-serif;
  --mono: "JetBrains Mono", ui-monospace, Menlo, monospace;

  /* INK palette (default) */
  --bg:        #fafaf7;
  --surface:   #ffffff;
  --surface-2: #f3f3ee;
  --border:    #1a1a1a;
  --border-soft: #e2e2dc;
  --hairline:  #c8c8c2;
  --text:      #0a0a0a;
  --text-muted:#5b5b56;
  --text-dim:  #8a8a83;

  --success: #1f6f3f;
  --warning: #b06f00;
  --danger:  #b1242c;
  --info:    #1c4a86;

  --accent:   #d6231a;
  --accent-fg:#ffffff;

  /* Geometry */
  --radius: 0px;
  --hair: 1px;
  --rule: 1px solid var(--hairline);
  --rule-strong: 1px solid var(--text);

  /* Spacing scale */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px; --s-10: 128px;

  /* Type scale */
  --t-display: clamp(56px, 9vw, 152px);
  --t-h1: clamp(40px, 5.5vw, 80px);
  --t-h2: clamp(30px, 4vw, 56px);
  --t-h3: clamp(24px, 3vw, 36px);
  --t-h4: 22px;
  --t-h5: 18px;
  --t-h6: 15px;
  --t-body-lg: 19px;
  --t-body: 16px;
  --t-body-sm: 14px;
  --t-caption: 12px;
  --t-overline: 11px;
}

[data-palette="stone"] {
  --bg: #f5f1ea;
  --surface: #fbf8f2;
  --surface-2: #ece6da;
  --border: #2a241c;
  --border-soft: #d9d2c2;
  --hairline: #beb6a4;
  --text: #1f1a13;
  --text-muted: #645c4d;
  --text-dim: #8e8676;
}

[data-palette="steel"] {
  --bg: #f1f3f5;
  --surface: #ffffff;
  --surface-2: #e3e7eb;
  --border: #11161c;
  --border-soft: #cfd5dc;
  --hairline: #adb6c0;
  --text: #0c1117;
  --text-muted: #4a5260;
  --text-dim: #7a8390;
}

[data-theme="dark"] {
  --bg: #0c0c0a;
  --surface: #141412;
  --surface-2: #1c1c19;
  --border: #f4f4ee;
  --border-soft: #2a2a26;
  --hairline: #3a3a35;
  --text: #f4f4ee;
  --text-muted: #a3a39d;
  --text-dim: #6e6e68;
  --success: #4fae6e;
  --warning: #d99b3a;
  --danger:  #ec5b62;
  --info:    #5b8fd8;
}

[data-theme="dark"][data-palette="stone"] {
  --bg: #14110b; --surface: #1c1812; --surface-2: #25201a;
  --border-soft: #322c22; --hairline: #443d2f;
  --text: #f1eadc; --text-muted: #a59c89; --text-dim: #6f6857;
}

[data-theme="dark"][data-palette="steel"] {
  --bg: #07090b; --surface: #0e1115; --surface-2: #161b21;
  --border-soft: #232a32; --hairline: #38424d;
  --text: #eef2f7; --text-muted: #99a3b0; --text-dim: #5d6772;
}
```

- [ ] **Step 2: Write _tokens.scss**

Non-themeable constants:

```scss
// _tokens.scss — Non-themeable design constants (Swiss Editorial)

// Font stacks (themed, but defined here for import order)
// Font stacks are in _themes.scss

// Spacing scale reference
// 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

// Z-index scale
$z-panel: 60;
$z-topbar: 50;
$z-overlay: 100;
```

- [ ] **Step 3: Write _typography.scss**

```scss
// _typography.scss — Swiss Editorial typography

html {
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--sans);
  font-size: var(--t-body);
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6, .display {
  font-family: var(--serif);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.05;
  margin: 0;
}

.display { font-size: var(--t-display); letter-spacing: -0.04em; line-height: 0.92; }
h1 { font-size: var(--t-h1); letter-spacing: -0.025em; }
h2 { font-size: var(--t-h2); letter-spacing: -0.02em; }
h3 { font-size: var(--t-h3); }
h4 { font-size: var(--t-h4); }
h5 { font-size: var(--t-h5); }
h6 { font-size: var(--t-h6); }

p { margin: 0; }
a { color: var(--accent); text-underline-offset: 3px; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

- [ ] **Step 4: Write _reset.scss**

```scss
// _reset.scss

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  transition: background-color 120ms ease, color 120ms ease;
}
```

- [ ] **Step 5: Write _utilities.scss**

```scss
// _utilities.scss

.page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--s-7);

  @media (max-width: 900px) { padding: 0 var(--s-4); }
}
```

- [ ] **Step 6: Update styles.scss**

```scss
// styles.scss — Swiss Editorial global entry
@use 'styles/tokens';
@use 'styles/themes';
@use 'styles/typography';
@use 'styles/reset';
@use 'styles/utilities';

// Google Fonts are loaded via index.html <link>
```

- [ ] **Step 7: Update index.html**

Add Google Fonts link in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Task 2.3: Core module — singletons

**Files:**
- Create: `catalogue1/src/app/core/core.module.ts`
- Create: `catalogue1/src/app/core/services/theme.service.ts`
- Create: `catalogue1/src/app/core/services/icon-registry.service.ts`
- Create: `catalogue1/src/app/core/services/breakpoint.service.ts`
- Create: `catalogue1/src/app/core/index.ts`

- [ ] **Step 1: Write CoreModule**

```typescript
// core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule | null) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }
}
```

- [ ] **Step 2: Write ThemeService**

```typescript
// core/services/theme.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type PaletteName = 'ink' | 'stone' | 'steel';

const STORAGE_KEYS = { theme: 'c1-theme', palette: 'c1-palette', accent: 'c1-accent' };

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);
  private html = this.document.documentElement;

  theme = signal<ThemeMode>(this.loadTheme());
  palette = signal<PaletteName>(this.loadPalette());
  accent = signal<string>(this.loadAccent());

  accentFg = computed(() => this.computeAccentFg(this.accent()));

  constructor() {
    this.applyTheme();
    this.applyPalette();
    this.applyAccent();
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

  private applyTheme(): void {
    this.html.dataset['theme'] = this.theme();
  }

  private applyPalette(): void {
    this.html.dataset['palette'] = this.palette();
  }

  private applyAccent(): void {
    this.html.style.setProperty('--accent', this.accent());
    this.html.style.setProperty('--accent-fg', this.accentFg());
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
```

- [ ] **Step 3: Write IconRegistryService**

```typescript
// core/services/icon-registry.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

export type IconName = string; // Will be refined as we add icons

@Injectable({ providedIn: 'root' })
export class IconRegistryService {
  private readonly spritePath = 'icons/sprite.svg';
  private loaded = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private http: HttpClient
  ) {}

  load(): Observable<void> {
    if (this.loaded) return of(undefined);
    return this.http.get(this.spritePath, { responseType: 'text' }).pipe(
      tap(svg => {
        const div = this.doc.createElement('div');
        div.style.display = 'none';
        div.innerHTML = svg;
        this.doc.body.appendChild(div);
        this.loaded = true;
      })
    );
  }

  resolve(name: string): string {
    return `#icon-${name}`;
  }
}
```

- [ ] **Step 4: Write BreakpointService**

```typescript
// core/services/breakpoint.service.ts
import { Injectable, signal, inject, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

@Injectable({ providedIn: 'root' })
export class BreakpointService implements OnDestroy {
  private document = inject(DOCUMENT);
  private window = this.document.defaultView!;
  private mql768 = this.window.matchMedia('(min-width: 768px)');
  private mql1024 = this.window.matchMedia('(min-width: 1024px)');

  current = signal<Breakpoint>(this.compute());
  isMobile = computed(() => this.current() === 'mobile');
  isTablet = computed(() => this.current() === 'tablet');
  isDesktop = computed(() => this.current() === 'desktop');

  private handler = () => this.current.set(this.compute());

  constructor() {
    this.mql768.addEventListener('change', this.handler);
    this.mql1024.addEventListener('change', this.handler);
  }

  ngOnDestroy(): void {
    this.mql768.removeEventListener('change', this.handler);
    this.mql1024.removeEventListener('change', this.handler);
  }

  private compute(): Breakpoint {
    if (this.mql1024.matches) return 'desktop';
    if (this.mql768.matches) return 'tablet';
    return 'mobile';
  }
}
```

Note: Add `import { computed } from '@angular/core';` in BreakpointService.

- [ ] **Step 5: Create core/index.ts barrel**

```typescript
export { CoreModule } from './core.module';
export { ThemeService } from './services/theme.service';
export type { ThemeMode, PaletteName } from './services/theme.service';
export { IconRegistryService } from './services/icon-registry.service';
export type { IconName } from './services/icon-registry.service';
export { BreakpointService } from './services/breakpoint.service';
export type { Breakpoint } from './services/breakpoint.service';
```

### Task 2.4: Create sprite.svg

**Files:**
- Create: `catalogue1/public/icons/sprite.svg`

- [ ] **Step 1: Write sprite.svg with initial icon set**

Draw from icons visible in C1 HTML: unpicode characters used as icons (⎙ ★ ⌕ ⚙ ⊕) and common system icons.

```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </symbol>
  <symbol id="icon-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </symbol>
  <symbol id="icon-settings" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </symbol>
  <symbol id="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </symbol>
  <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </symbol>
  <symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </symbol>
  <symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </symbol>
  <symbol id="icon-chevron-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </symbol>
  <symbol id="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </symbol>
  <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </symbol>
  <symbol id="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </symbol>
  <symbol id="icon-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </symbol>
</svg>
```

### Task 2.5: Shared components — Icon component

**Files:**
- Create: `catalogue1/src/app/shared/components/icon/icon.component.ts`
- Create: `catalogue1/src/app/shared/components/icon/icon.component.html`
- Create: `catalogue1/src/app/shared/components/icon/icon.component.scss`
- Create: `catalogue1/src/app/shared/components/icon/icon.component.spec.ts`
- Create: `catalogue1/src/app/shared/components/icon/icon.types.ts`
- Create: `catalogue1/src/app/shared/components/icon/index.ts`

- [ ] **Step 1: Write icon.types.ts**

```typescript
export type IconName =
  | 'search'
  | 'star'
  | 'settings'
  | 'heart'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'close'
  | 'check'
  | 'plus'
  | 'info';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

- [ ] **Step 2: Generate icon component with Angular CLI**

```bash
cd catalogue1
ng g c shared/components/icon
```

- [ ] **Step 3: Write icon.component.ts**

```typescript
import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { IconRegistryService } from '@core/services/icon-registry.service';
import type { IconName, IconSize } from './icon.types';

@Component({
  selector: 'app-icon',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  private registry = inject(IconRegistryService);

  @Input({ required: true }) name!: IconName;
  @Input() size: IconSize | number = 'md';
  @Input() ariaLabel?: string;

  private sizeMap: Record<IconSize, number> = {
    xs: 12, sm: 16, md: 20, lg: 24, xl: 32,
  };

  get pixelSize(): number {
    return typeof this.size === 'number' ? this.size : this.sizeMap[this.size];
  }

  get href(): string {
    return this.registry.resolve(this.name);
  }
}
```

- [ ] **Step 4: Write icon.component.html**

```html
<svg
  [attr.width]="pixelSize"
  [attr.height]="pixelSize"
  [attr.aria-hidden]="!ariaLabel ? true : null"
  [attr.role]="ariaLabel ? 'img' : null"
  [attr.aria-label]="ariaLabel || null"
>
  <use [attr.href]="href"></use>
</svg>
```

- [ ] **Step 5: Write icon.component.scss**

```scss
:host {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

svg {
  display: block;
  color: currentColor;
}
```

- [ ] **Step 6: Write icon.component.spec.ts**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { IconRegistryService } from '@core/services/icon-registry.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.name = 'check';
    fixture.detectChanges();
  });

  it('renders an svg with correct href', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    const use = svg.querySelector('use');
    expect(use.getAttribute('href')).toBe('#icon-check');
  });

  it('sets default size to md (20px)', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('20');
    expect(svg.getAttribute('height')).toBe('20');
  });

  it('respects size input', () => {
    component.size = 'lg';
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('24');
  });

  it('sets aria-hidden when no ariaLabel', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('aria-label')).toBeNull();
  });

  it('sets role and aria-label when ariaLabel provided', () => {
    component.ariaLabel = 'Close dialog';
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Close dialog');
  });
});
```

### Task 2.6: Shared components — Button component

**Generation pattern:** For each remaining component, use `ng g c shared/components/<name>`, then replace generated files with production code. All components follow this same pattern. I'll detail ButtonComponent fully, then provide reference for remaining components.

**Files:**
- Create/Modify: `catalogue1/src/app/shared/components/button/button.component.ts`
- `button.component.html`, `button.component.scss`, `button.component.spec.ts`, `button.types.ts`, `index.ts`

- [ ] **Step 1: Generate**

```bash
cd catalogue1
ng g c shared/components/button
```

- [ ] **Step 2: Write button.types.ts**

```typescript
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';
```

- [ ] **Step 3: Write button.component.ts**

```typescript
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import type { ButtonVariant, ButtonSize } from './button.types';

@Component({
  selector: 'app-button',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;

  @Output() clicked = new EventEmitter<MouseEvent>();
}
```

- [ ] **Step 4: Write button.component.html**

```html
<button
  [type]="type"
  class="btn"
  [ngClass]="'btn-' + variant"
  [class.btn-sm]="size === 'sm'"
  [class.btn-lg]="size === 'lg'"
  [class.-loading]="loading"
  [disabled]="disabled || loading"
  [attr.aria-label]="ariaLabel || null"
  (click)="clicked.emit($event)"
>
  <ng-content></ng-content>
</button>
```

- [ ] **Step 5: Write button.component.scss**

Source styles from HTML lines 299-326 (C1), replacing hardcoded values with `var(--token)`:

```scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1;
  padding: 12px 20px;
  border: 1px solid transparent;
  cursor: pointer;
  background: transparent;
  color: var(--text);
  transition: all 120ms ease;
  text-decoration: none;
  min-height: 44px;

  &-primary {
    background: var(--accent);
    color: var(--accent-fg);
    &:hover { filter: brightness(0.92); }
  }

  &-secondary {
    border-color: var(--text);
    color: var(--text);
    &:hover { background: var(--text); color: var(--bg); }
  }

  &-tertiary {
    color: var(--text);
    &:hover { color: var(--accent); }
    &::after { content: " ↗"; opacity: 0.6; }
  }

  &-destructive {
    background: var(--danger);
    color: #fff;
    &:hover { filter: brightness(0.9); }
  }

  &.-loading {
    color: transparent;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      margin: auto;
      width: 14px;
      height: 14px;
      border: 2px solid currentColor;
      color: var(--accent-fg);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 800ms linear infinite;
    }
  }

  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  &-sm { font-size: 12px; padding: 8px 14px; min-height: 36px; }
  &-lg { font-size: 16px; padding: 16px 28px; min-height: 52px; }
}

@keyframes spin { to { transform: rotate(360deg); } }
```

- [ ] **Step 6: Write button.component.spec.ts**

Tests: renders, applies variant class, applies size class, emits clicked, disables when loading.

### Task 2.7: Shared components — IconButton component

**Files:** `shared/components/icon-button/`

Generate, then compose IconComponent + ButtonComponent internally. Inputs: `icon: IconName`, `variant`, `size`, `ariaLabel`.

```html
<app-button
  [variant]="variant"
  [size]="size"
  [disabled]="disabled"
  [ariaLabel]="ariaLabel || icon"
  (clicked)="clicked.emit($event)"
>
  <app-icon [name]="icon" [size]="iconSize"></app-icon>
</app-button>
```

### Task 2.8–2.19: Remaining form components

Build in order:
- **2.8:** InputComponent — `@Input() label, type, placeholder, value, disabled, state: 'default'|'error'|'success', helper`
- **2.9:** TextareaComponent — similar API
- **2.10:** SelectComponent — `@Input() options, multiple, size`
- **2.11:** CheckboxComponent — `@Input() label, checked`
- **2.12:** RadioGroupComponent — `@Input() name, options: {label, value}[], value`
- **2.13:** ToggleComponent — `@Input() label, checked`
- **2.14:** SliderComponent — `@Input() min, max, value, label`
- **2.15:** SearchComponent — wraps InputComponent with search icon
- **2.16:** UploadComponent — `@Input() label`

Each follows the same generate-write pattern. SCSS sourced verbatim from HTML lines 333-391 (C1), replacing hex values with `var(--token)`.

### Task 2.20–2.26: Card components

- **2.20:** CardComponent — base with `<ng-content>` slots
- **2.21:** CardFeatureComponent — composes CardComponent with `variant="feature"`
- **2.22:** CardPricingComponent — composes CardComponent
- **2.23:** CardProfileComponent — composes CardComponent
- **2.24:** CardStatComponent — composes CardComponent
- **2.25:** CardMediaComponent — composes CardComponent
- **2.26:** AvatarComponent — `@Input() initials, size`

SCSS sourced from HTML lines 393-448.

### Task 2.27–2.34: Navigation components

- **2.27:** NavbarComponent
- **2.28:** SidebarComponent
- **2.29:** TabsComponent + TabComponent
- **2.30:** BreadcrumbsComponent
- **2.31:** PaginationComponent
- **2.32:** BottomNavComponent

SCSS sourced from HTML lines 450-488.

### Task 2.35–2.43: Data display components

- **2.35:** TableComponent — `@Input() columns: TableColumn[], rows: Record<string, unknown>[]`
- **2.36:** BadgeComponent — `@Input() variant`
- **2.37:** TagComponent
- **2.38:** ListComponent + ListItemComponent
- **2.39:** KeyValueComponent
- **2.40:** AvatarGroupComponent
- **2.41:** EmptyStateComponent

SCSS sourced from HTML lines 490-528.

### Task 2.44–2.51: Feedback components

- **2.44:** AlertComponent — `@Input() variant`
- **2.45:** ToastComponent + ToastService
- **2.46:** ModalComponent — focus trap
- **2.47:** DrawerComponent
- **2.48:** TooltipDirective
- **2.49:** PopoverDirective
- **2.50:** ProgressBarComponent
- **2.51:** SkeletonComponent

SCSS sourced from HTML lines 530-572.

### Task 2.52: SharedModule assembly

**Files:**
- Create: `catalogue1/src/app/shared/shared.module.ts`
- Create: `catalogue1/src/app/shared/index.ts`

Declare and export every component, directive, and pipe created above. Re-export `CommonModule` and `ReactiveFormsModule`.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Import all components
import { IconComponent } from './components/icon/icon.component';
import { ButtonComponent } from './components/button/button.component';
// ... all other component imports

const COMPONENTS = [
  IconComponent,
  ButtonComponent,
  // ... all components
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, ...COMPONENTS],
})
export class SharedModule {}
```

### Task 2.53: ThemeControls component

**Files:**
- Create: `catalogue1/src/app/shared/components/theme-controls/theme-controls.component.ts`
- `theme-controls.component.html`, `theme-controls.component.scss`, `index.ts`

This component mirrors the HTML theme panel (lines 183-231). Inputs: none (it injects ThemeService directly). Renders theme toggle, palette buttons, accent swatches, hex input.

```typescript
@Component({
  selector: 'app-theme-controls',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './theme-controls.component.html',
  styleUrls: ['./theme-controls.component.scss'],
})
export class ThemeControlsComponent {
  private themeService = inject(ThemeService);
  open = signal(false);
  hexValue = signal('');

  readonly ACCENTS = [
    { hex: '#d6231a', label: 'Hot Red' },
    { hex: '#0e6efd', label: 'Marine' },
    { hex: '#1f6f3f', label: 'Forest' },
    { hex: '#e08a00', label: 'Amber' },
    { hex: '#5b3ad6', label: 'Violet' },
    { hex: '#0a0a0a', label: 'Ink' },
  ];

  readonly PALETTES: PaletteName[] = ['ink', 'stone', 'steel'];

  // Methods: toggle, setTheme, setPalette, setAccent, onHexChange
}
```

### Task 2.54: MainLayout component

**Files:**
- Create: `catalogue1/src/app/layouts/main-layout/main-layout.component.ts`
- `main-layout.component.html`, `main-layout.component.scss`
- Create: `catalogue1/src/app/layouts/main-layout/main-layout.module.ts`

Hosts the sticky topbar (matching HTML lines 158-189), theme panel toggle, and `<router-outlet>`. Bottom of layout: `<app-theme-controls>`.

### Task 2.55: AppModule + AppComponent + Routing

**Files:**
- Modify: `catalogue1/src/app/app.module.ts`
- Modify: `catalogue1/src/app/app.component.ts`
- Modify: `catalogue1/src/app/app-routing.module.ts`

```typescript
// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Lazy-load catalogue feature at `/`:

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@features/catalogue/catalogue.module').then(m => m.CatalogueModule),
  },
];
```

Add `APP_INITIALIZER` for icon sprite loading to AppModule.

### Task 2.56: Catalogue feature module + sections

**Files:**
- Create: `catalogue1/src/app/features/catalogue/catalogue.module.ts`
- `catalogue-routing.module.ts`
- Create: `catalogue1/src/app/features/catalogue/pages/catalogue-home/catalogue-home.component.ts`
- Create: 10 section components under `features/catalogue/sections/`

Each section component imports SharedModule and renders the corresponding HTML section using real Angular components. For example, `ButtonsSectionComponent`:

```html
<section class="section">
  <header class="section-head">
    <span class="section-num">04 / 10</span>
    <div>
      <h2 class="section-title">Buttons</h2>
      <p class="section-meta">Variants · Sizes · States</p>
    </div>
  </header>

  <div class="btn-grid">
    <span class="label">Primary</span>
    <div class="btn-cluster">
      <app-button variant="primary" size="sm">Subscribe</app-button>
      <app-button variant="primary">Subscribe</app-button>
      <app-button variant="primary" size="lg">Subscribe</app-button>
      <app-button variant="primary" [loading]="true">Subscribe</app-button>
      <app-button variant="primary" [disabled]="true">Subscribe</app-button>
    </div>
    <!-- ... all variants -->
  </div>
</section>
```

The catalogue home page (`catalogue-home.component.html`) composes all 10 sections in order:

```html
<app-identity-section></app-identity-section>
<app-colors-section></app-colors-section>
<app-typography-section></app-typography-section>
<app-buttons-section></app-buttons-section>
<app-forms-section></app-forms-section>
<app-cards-section></app-cards-section>
<app-navigation-section></app-navigation-section>
<app-data-section></app-data-section>
<app-feedback-section></app-feedback-section>
<app-patterns-section></app-patterns-section>
```

### Task 2.57: Verification — build, lint, test, side-by-side

- [ ] **Step 1: Build**

```bash
cd catalogue1 && npm run build
```
Expected: Zero warnings.

- [ ] **Step 2: Lint**

```bash
cd catalogue1 && npm run lint
```
Expected: Zero issues.

- [ ] **Step 3: Test**

```bash
cd catalogue1 && npm test
```
Expected: All passing.

- [ ] **Step 4: Side-by-side visual verification**

Open `Catalogue/catalogue-01-swiss-editorial.html` in browser and `npm start` in another tab. Verify at 360/768/1024/1440px in light+dark themes and all three palettes. Fix any drift.

- [ ] **Step 5: Update pixel-perfect-checklist.md** with verification results.

---

## Phase 3: Catalogue 2 — Neo-Brutalist

This follows the identical pattern as Phase 2 with these differences:

- **Project name:** `catalogue2/`
- **Source HTML:** `Catalogue/catalogue-02-neo-brutalist.html`
- **Fonts:** Space Grotesk + JetBrains Mono (Google Fonts link in index.html)
- **Palettes:** concrete, toxic, riso
- **Accent presets:** #ffd400, #ff5af0, #00ffd5, #ff3a3a, #2c5cff, #1ea654
- **Additional tokens:** `--accent-2`, `--shadow`/`--shadow-lg`/`--shadow-sm`, `--bw`/`--bw-thick`
- **ThemeService:** Add `--accent-2` support, palette type is `'concrete' | 'toxic' | 'riso'`
- **ThemeControls:** Different accent swatches, palette names
- **Background:** Dot grid pattern on body via radial-gradient (add to _reset.scss)
- **Component styling:** All SCSS uses `var(--bw)` for borders, `var(--shadow)` for box-shadows, uppercase labels, no border-radius
- **Button variants:** primary/secondary/tertiary/destructive (no tertiary `↗` suffix, uses dashed border instead)
- **Badge/Tag:** Different styling (background-color vs just text color)
- **Alert:** Icon box inside alert (different layout)
- **Table:** Dark header row with light text
- **Content:** All section copy matches C2 HTML (band/merch/tour content vs editorial content)

### Specific component differences from C1

| Component | C1 | C2 |
|---|---|---|
| Button: tertiary | Underline + ↗ | Dashed border, no suffix |
| Button: hover | Filter brightness | Translate + box-shadow increase |
| Input: focus | Outline + box-shadow | Background becomes accent color |
| Input: error | Border color change | Background gets danger tint |
| Card: eyebrow | Mono text with accent color | Accent bg with border, uppercase |
| Card: feature | Text bg, light text | Same but no border-radius |
| Modal | box-shadow offset with text color | box-shadow uses shadow-lg |
| Progress | 4px height, accent bg | 16px height, accent bg, border |
| Checkbox: checked | Background becomes text color | Background becomes accent, shows ✕ |
| Toggle | 40×22, square | 56×28, larger |
| Slider: thumb | 18×18, accent bg | 24×24, accent bg, bordered, shadow |
| Section head | Mono number + serif title, rule border | Black bg block with shadow, rotated -0.5deg |
| Nav links | underline on hover | border + accent bg on hover |
| Pagination | hairline border, -1px margin | 2px border, 2px shadow, separate gap |
| Tabs | 2px bottom accent border | Button-like with border and accent bg |
| Avatar | Square, hairline border | Accent bg, bordered, shadow |
| Badge | border + text color only | Full background color, no border |
| Tag | surface-2 bg, no border | accent bg, border |
| Tooltip | text bg, no border | text bg, bordered |
| Popover | box-shadow offset | shadow |

### Task structure (reference only)

Repeat Phase 2 tasks 2.1–2.57 for catalogue2 with the differences noted above. The pattern is identical:

1. Generate project scaffold
2. Extract tokens from C2 HTML into `_themes.scss`
3. Create CoreModule + C2-specific ThemeService (palette union: `'concrete' | 'toxic' | 'riso'`, accent-2 support)
4. Create sprite.svg
5. Build all shared components (same inventory, different SCSS sourced from C2 HTML)
6. Assemble SharedModule
7. Create ThemeControls (different accent presets, palette names)
8. Create MainLayout
9. Configure AppModule + routing
10. Build catalogue feature with 10 sections using real components
11. Verify: build, lint, test, side-by-side at all breakpoints/themes/palettes

---

## Phase 4: Catalogue 3 — Glassmorphic Spatial

Follows Phase 2 pattern with these differences:

- **Project name:** `catalogue3/`
- **Source HTML:** `Catalogue/catalogue-03-glassmorphic-spatial.html`
- **Fonts:** Plus Jakarta Sans + JetBrains Mono
- **Default theme:** Dark (NOT light)
- **Palettes:** Uses `[data-aurora]` instead of `[data-palette]`: dawn, reef, ember, forest
- **Extra control:** `[data-radius]`: soft, round, sharp — remaps `--r-1` through `--r-6`
- **ThemeService:** No `palette` signal; has `aurora` and `radiusVariant` signals instead
- **Tokens:** Glass layers, aurora colors, hairline variants, shadow-1/shadow-2/shadow-pop
- **Background elements:** Fixed `.aurora` div (animated gradients) and `.grain` div (noise overlay) — rendered in `AppComponent` template
- **Border-radius:** `var(--r-3)` through `var(--r-6)` on all components
- **Glass primitives:** `.glass`, `.glass-thin`, `.glass-pill` — used across components
- **Component styling:** All use `backdrop-filter: blur()`, `var(--glass-N)` for backgrounds, `var(--shadow-1)`/`var(--shadow-2)` for shadows
- **Button variants:** primary (gradient), secondary, ghost (not tertiary), destructive, glow (outline gradient)
- **Input:** Glass background with backdrop-filter
- **Toggle:** 44×26, pill-shaped
- **Slider:** 4px track, 22×22 round thumb
- **Card:** Glass background with `::before` gradient overlay
- **Card-feature:** Aurora gradient background overlay
- **Badge:** Pill-shaped with dot indicator
- **Tag:** Pill-shaped with glow variant
- **Avatar:** Circular with conic-gradient background
- **Modal:** Glass background, backdrop-blur scrim
- **Drawer:** Glass background, rounded
- **Topbar:** Floating pill capsule (not full-width bar)
- **Nav:** Capsule-shaped with glass background
- **Tabs:** Pill-shaped segmented control
- **Pagination:** Pill-shaped segmented control
- **Bottom-nav:** Pill-shaped capsule
- **Alert:** Tinted glass background
- **Toast:** Pill-shaped glass capsule
- **Progress:** Gradient bar with border-radius
- **Section head:** Inline meta + heading (no border, no background block)

### Specific component differences from C1

| Component | C1 | C3 |
|---|---|---|
| All surfaces | border: var(--rule) | border: 1px solid var(--hairline) |
| All surfaces | background: var(--surface) | background: var(--glass-1) |
| All surfaces | no backdrop-filter | backdrop-filter: blur(28px) |
| All surfaces | 0px border-radius | var(--r-4) border-radius |
| Button: primary | accent bg | gradient bg + glow shadow |
| Button: secondary | text border, text color | glass-3 bg |
| Button: ghost | N/A (tertiary instead) | transparent + hairline border |
| Button: glow | N/A | glass-2 bg + gradient border outline |
| Input | solid surface bg | glass-2 bg + backdrop-filter |
| Card | surface bg + rule | glass-1 bg + blur + ::before highlight |
| Card-feature | text bg, light text | aurora gradient overlay on glass |
| Card-pricing | basic | checkmark list items (not em-dash) |
| Card-stat | serif number, mono delta | sans number, pill-shaped delta badge + spark SVG |
| Table: header | mono uppercase, hairline bottom | glass-2 bg, still uppercase |
| Table: striping | hover row highlight | hover row highlight, no striping |
| Badge | square, border, text color | pill, dot indicator, tinted bg |
| Tag | surface-2 bg, no radius | pill, glass bg, glow variant |
| Avatar | square, hairline border | circle, conic-gradient, sizes sm/md/lg |
| Avatar-group | overlapping squares | overlapping circles, conic-gradient colors |
| Modal | box-shadow offset | backdrop-blur scrim, glass-3 surface |
| Topbar | full-width sticky bar | floating pill capsule (max-width, centered) |
| Section-head | mono+serif, rule border, tight | inline flex, lede paragraph |
| Tabs | bottom border accent | pill segmented control |
| Pagination | separate bordered squares | pill segmented control |
| Toast | text-bg, square | glass capsule, pill, with icon |
| KeyValue | table-like grid | pill container with rows, glass bg |

### Extra components (C3 only)

- `SparkChartComponent` — SVG sparkline (used in stat card)
- `ProgressBarComponent` — uses `linear-gradient()` fill instead of solid accent
- `NowPlayingComponent` — music player card with art, controls, progress
- `SignalRingComponent` — conic-gradient ring with text overlay
- `ChartComponent` — SVG area chart with gradient fills (dashboard section)

### Task structure (reference only)

Repeat Phase 2 tasks for catalogue3 with the differences noted above. The pattern is identical.

---

## Phase 5: Final Review

### Task 5.1: Run all verification commands for all three projects

- [ ] **Catalogue 1:**
  ```bash
  cd catalogue1 && npm run build && npm run lint && npm test
  ```

- [ ] **Catalogue 2:**
  ```bash
  cd catalogue2 && npm run build && npm run lint && npm test
  ```

- [ ] **Catalogue 3:**
  ```bash
  cd catalogue3 && npm run build && npm run lint && npm test
  ```

### Task 5.2: Update catalogue-mapping.md

Fill in the final component lists per catalogue with exact component names and cross-references.

### Task 5.3: Grep verification

```bash
# No standalone: true anywhere
git grep -n "standalone: true" catalogue1/src catalogue2/src catalogue3/src

# Every shared component has OnPush
git grep -L "OnPush" catalogue1/src/app/shared/components/**/*.component.ts
git grep -L "OnPush" catalogue2/src/app/shared/components/**/*.component.ts
git grep -L "OnPush" catalogue3/src/app/shared/components/**/*.component.ts

# No hardcoded hex in component SCSS
git grep -nE "#[0-9a-fA-F]{3,8}" catalogue1/src/app/shared/components/**/*.scss
git grep -nE "#[0-9a-fA-F]{3,8}" catalogue2/src/app/shared/components/**/*.scss
git grep -nE "#[0-9a-fA-F]{3,8}" catalogue3/src/app/shared/components/**/*.scss
```

Expected: All return empty or only show legitimate matches (icon paths, comments).

### Task 5.4: Final commit

```bash
git add -A
git commit -m "feat: complete three-catalogue Angular workspace"
```
