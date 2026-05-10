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
```
catalogueN/
├── angular.json
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.spec.json
├── public/icons/sprite.svg
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss
    ├── styles/ (_tokens.scss, _themes.scss, _typography.scss, _reset.scss, _utilities.scss, _mixins.scss)
    └── app/
        ├── app.module.ts / app.component.ts / app-routing.module.ts
        ├── core/ (CoreModule, services: ThemeService, IconRegistryService, BreakpointService)
        ├── shared/ (SharedModule, components/, directives/, pipes/, models/)
        ├── features/catalogue/ (CatalogueModule, pages/catalogue-home, sections/*)
        └── layouts/main-layout/ (MainLayoutModule, MainLayoutComponent)
```

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
