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
- Types file when a component has 3+ type unions or shared interfaces

## Content Projection

- Base cards use slot-based `<ng-content>`:

```html
<!-- CardComponent template -->
<div class="card">
  <ng-content select="[card-header]"></ng-content>
  <ng-content></ng-content>
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
