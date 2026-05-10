# Three-Catalogue Angular Workspace — Design Spec

**Date:** 2026-05-10
**Status:** Approved
**Angular version:** 19.x (latest stable)

## Goal

Produce a workspace of three independent, production-grade, NgModule-based Angular 19 starter projects — one per HTML design catalogue. Each project is a pluggable component library plus a working demo route that reproduces its source HTML pixel-for-pixel.

## Architecture

Three independent Angular CLI projects (`catalogue1/`, `catalogue2/`, `catalogue3/`) at the workspace root. They share folder structure, module boundaries, and conventions — not visuals or tokens.

### Workspace layout

```
root/
├── AGENTS.md / CLAUDE.md          # AI assistant conventions
├── README.md                       # Human overview
├── Catalogue/                      # Read-only source HTML (3 files)
├── docs/                           # Architecture, conventions, theming, icon-system, etc.
└── catalogue1/ catalogue2/ catalogue3/   # Independent Angular projects
```

### Per-project structure

```
catalogueN/
├── angular.json                    # Schematics enforce non-standalone + OnPush
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.spec.json
├── public/icons/sprite.svg
└── src/
    ├── styles.scss                  # Imports tokens, themes, reset
    ├── styles/                      # _tokens.scss, _themes.scss, _typography.scss, _reset.scss, _utilities.scss, _mixins.scss
    └── app/
        ├── app.module.ts            # Imports CoreModule, SharedModule, AppRoutingModule
        ├── app.component.ts
        ├── app-routing.module.ts
        ├── core/                    # Singletons: CoreModule, ThemeService, IconRegistryService, BreakpointService
        ├── shared/                  # SharedModule, components/, directives/, pipes/ — zero providers, pure presentational
        ├── features/catalogue/      # Lazy-loaded demo route at / — sections per HTML section
        └── layouts/main-layout/     # Hosts ThemeControlsComponent + router-outlet
```

### Hard rules (non-negotiable)

1. No standalone components/directives/pipes. Everything in NgModules.
2. `ChangeDetectionStrategy.OnPush` on every component.
3. No hardcoded colors/spacing/radii in components — use `var(--token)`.
4. `shared/*` has no business logic, no HTTP, no router injection.
5. `CoreModule` imported once (in AppModule); throws on re-import.
6. `SharedModule` has zero providers.
7. No `any`. Strict TypeScript only.
8. Path aliases for cross-folder imports: `@core`, `@shared`, `@features`, `@layouts`, `@theme`.
9. Components accept inputs, emit outputs, use `<ng-content>` for projection.
10. Accessibility: visible focus rings, ARIA labels, keyboard navigation.

### Tech stack

| Concern | Choice |
|---|---|
| Framework | Angular 19.x |
| Module system | NgModule (non-standalone) |
| Change detection | OnPush |
| Language | TypeScript strict |
| Styling | SCSS + CSS custom properties |
| Forms | Reactive Forms only |
| State | RxJS + Signals |
| HTTP | HttpClient via CoreModule |
| Routing | Lazy-loaded feature modules |
| Testing | Vitest |
| Linting | @angular-eslint + Prettier |
| Path aliases | @core, @shared, @features, @layouts, @theme |

## Per-Catalogue Identity

### Catalogue 1 — Swiss Editorial Minimal
- **Fonts:** Fraunces (serif), Inter (sans), JetBrains Mono (mono)
- **Default theme:** Light, palette: ink
- **Palettes:** ink, stone, steel (via `[data-palette]`)
- **Theme:** light / dark (via `[data-theme]`)
- **Accent:** Single `--accent` variable; 6 presets (hot red #d6231a, marine #0e6efd, forest #1f6f3f, amber #e08a00, violet #5b3ad6, ink #0a0a0a) + custom hex
- **Geometry:** `--radius: 0px`, `--hair: 1px`, all rules are `1px solid var(--hairline)`
- **Spacing:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- **Type scale:** Fluid clamp for display/h1/h2/h3; fixed for h4-h6, body, caption
- **Voice:** Edited. Confident. Quiet.
- **Signature:** Oversized italic numerals against 12-column rule grid

### Catalogue 2 — Neo-Brutalist
- **Fonts:** Space Grotesk (display/sans), JetBrains Mono (mono)
- **Default theme:** Light, palette: concrete
- **Palettes:** concrete, toxic, riso (via `[data-palette]`)
- **Theme:** light / dark (via `[data-theme]`)
- **Accent:** `--accent` + `--accent-2`; 6 presets + custom hex
- **Geometry:** `--bw: 3px`, `--bw-thick: 5px`, hard shadows (`--shadow: 6px 6px 0`, `--shadow-lg: 10px 10px 0`, `--shadow-sm: 3px 3px 0`)
- **Spacing:** 4, 8, 12, 16, 24, 32, 48, 64, 96
- **Background:** Dot grid pattern via radial-gradient
- **Voice:** Direct. Funny. Slightly rude.
- **Signature:** 3px black borders + hard offset shadows on every surface

### Catalogue 3 — Glassmorphic Spatial
- **Fonts:** Plus Jakarta Sans (display/sans), JetBrains Mono (mono)
- **Default theme:** Dark, aurora: dawn
- **Auroras:** dawn, reef, ember, forest (via `[data-aurora]`)
- **Theme:** light / dark (via `[data-theme]`)
- **Radius variant:** soft, round, sharp (via `[data-radius]`) — remaps `--r-1` through `--r-6`
- **Accent:** Tied to aurora selection (`--accent` + `--accent-2`)
- **Glass layers:** `--glass-1` (α0.06), `--glass-2` (α0.10), `--glass-3` (α0.14), `--glass-strong` (α0.22)
- **Blur:** 20px, 28px, 36px, 40px backdrop-filter
- **Background:** Fixed aurora gradients + grain overlay, both animated
- **Spacing:** Base 16px system
- **Voice:** Considered, quiet.
- **Signature:** Glass capsules with backdrop-blur and conic-gradient avatar rings

## Component Inventory (30+ per project)

### Buttons Section
- `ButtonComponent` — Inputs: `variant: 'primary'|'secondary'|'tertiary'|'ghost'|'destructive'|'glow'`, `size: 'sm'|'md'|'lg'`, `loading: boolean`, `disabled: boolean`
- `IconButtonComponent` — Inputs: `icon`, `variant`, `size`, `ariaLabel`

### Form Controls Section
- `InputComponent` — Inputs: `type`, `label`, `placeholder`, `value`, `disabled`, `state: 'default'|'error'|'success'`, `helper`
- `TextareaComponent` — similar API
- `SelectComponent` — Inputs: `options`, `multiple`, `size`
- `CheckboxComponent` — Inputs: `label`, `checked`
- `RadioGroupComponent` — Inputs: `name`, `options`, `value`
- `ToggleComponent` — Inputs: `label`, `checked`
- `SliderComponent` — Inputs: `min`, `max`, `value`, `label`
- `SearchComponent` — Wraps InputComponent with search icon
- `UploadComponent` — Inputs: `label`, `accept`
- `DateInputComponent` / `TimeInputComponent` — Native date/time inputs

### Cards Section
- `CardComponent` — `<ng-content>` slots: `[card-header]`, default, `[card-footer]`
- Variants via `variant` Input: `default`, `feature`, `pricing`, `profile`, `stat`, `media`
- Specialized sub-components: `PricingCardComponent`, `ProfileCardComponent`, `StatCardComponent`, `MediaCardComponent` (compose base CardComponent)

### Navigation Section
- `NavbarComponent` — Inputs: `brand`, `links`, `activeLink`
- `SidebarComponent` — Inputs: `sections`, `activeItem`
- `TabsComponent` + `TabComponent` — Inputs: `tabs`, `activeTab`
- `BreadcrumbsComponent` — Inputs: `crumbs`
- `PaginationComponent` — Inputs: `current`, `total`, Output: `pageChange`
- `BottomNavComponent` — Inputs: `items`, `activeItem`

### Data Display Section
- `TableComponent` — Inputs: `columns: TableColumn[]`, `rows`, `sortable`
- `BadgeComponent` — Inputs: `variant: 'success'|'warning'|'danger'|'info'|'neutral'`
- `TagComponent` — Inputs: `variant: 'default'|'alt'|'glow'`
- `ListComponent` + `ListItemComponent` — Inputs: `icon`, `title`, `subtitle`, `meta`
- `KeyValueComponent` — Inputs: `items: {key, value}[]`
- `AvatarComponent` — Inputs: `initials`, `size: 'sm'|'md'|'lg'`, `src?`
- `AvatarGroupComponent` — Inputs: `avatars`, `max`
- `EmptyStateComponent` — Inputs: `title`, `description`, `actionLabel`

### Feedback Section
- `AlertComponent` — Inputs: `variant: 'success'|'warning'|'danger'|'info'`, `title`, `message`, `actionLabel`
- `ToastComponent` + `ToastService` — Service manages toast queue; component renders
- `ModalComponent` — Inputs: `open`, `title`, Output: `close`. Focus trap.
- `DrawerComponent` — Inputs: `open`, `title`, `position: 'right'|'left'`
- `TooltipDirective` — Inputs: `tooltip`
- `PopoverDirective` — Inputs: `popoverTitle`, `popoverContent`
- `ProgressBarComponent` — Inputs: `value`, `max`
- `SkeletonComponent` — Inputs: `variant: 'text'|'tall'|'img'`, `width`

### Layout Patterns Section
- `HeroComponent` — composed layout with eyebrow, heading, description, actions, figure
- `FeatureGridComponent` + `FeatureComponent` — numbered feature cards
- `CtaComponent` — call-to-action banner
- `FooterComponent` — multi-column footer

### Icon System
- `IconComponent` — Inputs: `name: IconName`, `size: IconSize`, `ariaLabel`
- `IconRegistryService` — Loads `sprite.svg` via APP_INITIALIZER, resolves `#icon-{name}`
- `sprite.svg` — One SVG file with `<symbol>` elements per icon

### Theme System
- `ThemeService` — Signals: `theme`, `accent`, `palette` (or `aurora`, `radius`). Persists to localStorage. Applies via DOM dataset/style.
- `ThemeControlsComponent` — Renders theme toggle, palette/aurora buttons, accent swatches + custom hex input (radius controls for C3). Mounted in MainLayoutComponent.

## Design Tokens (per catalogue)

### C1 (Swiss Editorial) — Token sources
- **Colors:** `--bg`, `--surface`, `--surface-2`, `--border`, `--border-soft`, `--hairline`, `--text`, `--text-muted`, `--text-dim`
- **Semantic:** `--success`, `--warning`, `--danger`, `--info`
- **Accent:** `--accent`, `--accent-fg` (computed from luminance)
- **Typography:** `--serif`, `--sans`, `--mono`, `--t-display` through `--t-overline`
- **Geometry:** `--radius: 0px`, `--hair: 1px`, `--rule: 1px solid var(--hairline)`, `--rule-strong: 1px solid var(--text)`
- **Spacing:** `--s-1` through `--s-10`

### C2 (Neo-Brutalist) — Token sources
- **Colors:** `--bg`, `--surface`, `--surface-2`, `--text`, `--text-muted`, `--text-dim`, `--border`
- **Semantic:** `--success`, `--warning`, `--danger`, `--info`
- **Accents:** `--accent`, `--accent-2`, `--accent-fg`
- **Shadows:** `--shadow`, `--shadow-lg`, `--shadow-sm`
- **Borders:** `--bw: 3px`, `--bw-thick: 5px`
- **Typography:** `--display`, `--sans`, `--mono`
- **Spacing:** `--s-1` through `--s-9`
- **Background:** Dot grid via radial-gradient on body

### C3 (Glassmorphic) — Token sources
- **Colors:** `--bg-deep`, `--bg-mid`, `--ink`, `--ink-soft`, `--ink-mute`, `--ink-faint`
- **Glass:** `--glass-1` through `--glass-strong`
- **Hairlines:** `--hairline`, `--hairline-bold`, `--hairline-glow`
- **Aurora:** `--aurora-1` through `--aurora-4`
- **Accents:** `--accent`, `--accent-2`
- **Semantic:** `--success`, `--warning`, `--danger`, `--info`
- **Shadows:** `--shadow-1`, `--shadow-2`, `--shadow-pop`
- **Radius:** `--r-1` through `--r-6` (remapped by `[data-radius]`)
- **Spacing:** `--pad`, `--bx`
- **Background:** Fixed `.aurora` (animated gradients) + `.grain` (noise overlay)
- **Typography:** `--display`, `--sans`, `--mono`

## Theme service API

```typescript
// ThemeService (in core/services/)
theme: WritableSignal<'light' | 'dark'>
accent: WritableSignal<string>           // hex value
accentFg: Signal<string>                 // computed: white or black based on luminance

// C1 + C2:
palette: WritableSignal<string>          // palette name

// C3:
aurora: WritableSignal<string>           // aurora name
radiusVariant: WritableSignal<'soft' | 'round' | 'sharp'>

setTheme(t: 'light' | 'dark'): void
setAccent(hex: string): void             // validates hex, computes accentFg
setPalette(p: string): void              // (C1/C2)
setAurora(a: string): void               // (C3)
setRadiusVariant(r: string): void        // (C3)
toggleTheme(): void
```

All methods persist to `localStorage` and apply via `document.documentElement.dataset` / `.style.setProperty`.

## Pixel-perfect fidelity strategy

1. **Token extraction first** — Copy every CSS custom property verbatim from each HTML into `_themes.scss`. Include `:root`, `[data-theme="dark"]`, and all `[data-palette]`/`[data-aurora]` blocks.
2. **Component-by-component** — For each component: locate its markup in HTML, lift to Angular template, replace literal values with `var(--token)`, parameterize via `@Input()`.
3. **Catalogue demo page** — Same 10 sections in same order, each as its own `features/catalogue/sections/<section-name>` component. Every UI element rendered through the corresponding `shared/components/*` Angular component.
4. **Side-by-side verification** — At 360/768/1024/1440px in both themes and all palettes. Document any unavoidable deviations in `docs/pixel-perfect-checklist.md`.

## Acceptance criteria

- `npm start` boots cleanly; catalogue demo at `/`
- `npm run build` zero warnings; `npm run lint` zero issues; `npm test` all pass
- No `standalone: true` anywhere; every component has OnPush
- No hardcoded hex in component SCSS
- WCAG AA contrast on both themes; visible focus rings
- Every CSS custom property from HTML exists in `_themes.scss` with identical values
- Every component variant reachable via Inputs, renders identically to HTML
- Side-by-side visual parity at all breakpoints, themes, palettes
- SharedModule importable into fresh Angular app without errors
- `docs/pixel-perfect-checklist.md` lists any unavoidable deviations

## Build order

1. Workspace scaffolding — CLAUDE.md, README.md, docs/*
2. Catalogue 1 (Swiss Editorial) — full project
3. Catalogue 2 (Neo-Brutalist) — full project
4. Catalogue 3 (Glassmorphic Spatial) — full project
5. Final review — lint, tests, build all three; update docs/catalogue-mapping.md
