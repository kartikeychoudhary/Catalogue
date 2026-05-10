# Angular Catalogue Starters

Three production-grade Angular 19 starter projects, each derived from a complete HTML design catalogue. Every project is a pluggable component library plus a working demo route that reproduces the source HTML pixel-for-pixel.

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

## Catalogue Files

The `Catalogue/` directory contains the three HTML design specifications. These are read-only reference files — the Angular projects must match them pixel-for-pixel.
