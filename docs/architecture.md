# Architecture

## Module Boundaries

```
features → shared → core (never reversed)
  ↓
layouts (wraps features)
```

- **CoreModule:** Singleton services (ThemeService, IconRegistryService, BreakpointService). Imported once in AppModule. Throws in constructor if imported a second time.
- **SharedModule:** Pure presentational components, directives, pipes. Zero providers. Re-exports CommonModule and ReactiveFormsModule. No HTTP, no router injection.
- **Feature modules:** Lazy-loaded via routing. Import SharedModule. Contain business logic, page components, and section compositions.
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
- **Template state:** async pipe for Observables; never manual `.subscribe()` + assign
- **No global state store (NgRx, etc.)** — not needed for a component library

## Why NgModules + OnPush

- NgModules provide explicit dependency boundaries and prevent accidental standalone mixing
- OnPush ensures components only re-render when inputs change, improving performance and enforcing immutable data patterns
