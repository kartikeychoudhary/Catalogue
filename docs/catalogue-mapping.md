# Catalogue Mapping

Maps each HTML section to its Angular component implementation across all three catalogues.

## Section → Component mapping (all catalogues)

| # | HTML Section | Angular Components | Notes |
|---|---|---|---|
| 01 | Identity Header | `IdentitySectionComponent` | Composed of headings, metadata, signature block |
| 02 | Color System | `ColorsSectionComponent` | Renders swatch grid, semantic colors, token strip |
| 03 | Typography | `TypographySectionComponent` | Renders type scale rows |
| 04 | Buttons | `ButtonsSectionComponent` | Renders `ButtonComponent` + `IconButtonComponent` in all variants/sizes/states |
| 05 | Form Controls | `FormsSectionComponent` | Renders all form components with validation states |
| 06 | Cards & Surfaces | `CardsSectionComponent` | Renders all card variants + avatar |
| 07 | Navigation | `NavigationSectionComponent` | Renders navbar, sidebar, tabs, breadcrumbs, pagination, bottom nav |
| 08 | Data Display | `DataSectionComponent` | Renders table, badges, tags, lists, key-value, avatars, empty state |
| 09 | Feedback & Overlays | `FeedbackSectionComponent` | Renders alerts, toasts, modal, drawer, tooltips, popovers, progress, skeleton |
| 10 | Layout Patterns | `PatternsSectionComponent` | Renders hero, feature grid, CTA, footer |

## Shared Components — All Three Catalogues

Every catalogue has these components in `shared/components/`:

### Buttons
- `button/` — `ButtonComponent` (variant, size, disabled, loading)
- `icon-button/` — `IconButtonComponent` (wraps Button + Icon)

### Forms
- `input/` — `InputComponent` (type, label, placeholder, value, disabled, state)
- `textarea/` — `TextareaComponent`
- `select/` — `SelectComponent` (options, multiple)
- `checkbox/` — `CheckboxComponent` (label, checked)
- `radio-group/` — `RadioGroupComponent` (name, options)
- `toggle/` — `ToggleComponent` (label, checked)
- `slider/` — `SliderComponent` (min, max, value, label)
- `search/` — `SearchComponent` (wraps InputComponent)
- `upload/` — `UploadComponent` (label, accept)

### Cards
- `card/` — `CardComponent` (base with `<ng-content>` slots)
- `avatar/` — `AvatarComponent` (initials, size, src?)

### Navigation
- `navbar/` — `NavbarComponent`
- `sidebar/` — `SidebarComponent`
- `tabs/` — `TabsComponent` (+ `TabComponent`)
- `breadcrumbs/` — `BreadcrumbsComponent`
- `pagination/` — `PaginationComponent`
- `bottom-nav/` — `BottomNavComponent`

### Data Display
- `table/` — `TableComponent`
- `badge/` — `BadgeComponent`
- `tag/` — `TagComponent`
- `list/` — `ListComponent` (+ `ListItemComponent`)
- `key-value/` — `KeyValueComponent`
- `avatar-group/` — `AvatarGroupComponent`
- `empty-state/` — `EmptyStateComponent`

### Feedback
- `alert/` — `AlertComponent`
- `toast/` — `ToastComponent` (+ `ToastService`)
- `modal/` — `ModalComponent` (focus trap)
- `drawer/` — `DrawerComponent`
- `tooltip/` — `TooltipDirective`
- `popover/` — `PopoverDirective`
- `progress/` — `ProgressBarComponent`
- `skeleton/` — `SkeletonComponent`

### System
- `icon/` — `IconComponent`
- `theme-controls/` — `ThemeControlsComponent`

## Catalogue 1 — Swiss Editorial

| Shared Component | Variant/State Coverage | Source HTML Lines |
|---|---|---|
| Button | primary/secondary/tertiary/destructive, sm/md/lg, loading, disabled | 299-326 |
| IconButton | primary/secondary, sm/md/lg | 316, 843-847 |
| Input | default/error/success, disabled, placeholder | 339-348 |
| Textarea | default, placeholder | 349 |
| Select | single, multiple | 383-393 |
| Checkbox | checked/unchecked | 351-356 |
| Radio | selected/unselected | 351-356 |
| Toggle | on/off | 358-362 |
| Slider | range input | 364-366 |
| Search | wrapped input with icon | 374-388 |
| Upload | drag-and-drop zone | 368-372 |
| Card | default, feature, pricing, profile, stat, media | 393-448 |
| Avatar | initials, sizes | 420-426 |
| AvatarGroup | stacked with +N overflow | 521-524 |
| Badge | success/warning/danger/info/neutral | 500-505 |
| Tag | default | 506 |
| Alert | success/warning/danger/info with icon + action | 531-538 |
| Toast | default, with action button | 540-547 |
| Modal | with actions | 549-552 |
| Drawer | right-side, with comments | 554-556 |
| Table | sortable headers, hover rows | 490-498 |
| List | with icon, title, subtitle, badge | 507-513 |
| KeyValue | dt/dd pairs with borders | 515-519 |
| EmptyState | with title, description, link | 526-528 |
| Tabs | active state, bottom border accent | 470-472 |
| Breadcrumbs | link chain with separators | 474-477 |
| Pagination | active page, ellipsis | 479-484 |
| BottomNav | active state | 485-488 |
| Progress | value bar | 566-567 |
| Skeleton | text, tall, image variants | 569-571 |
| Tooltip | hover trigger | 558-561 |
| Popover | toggle trigger | 563-564 |

## Catalogue 2 — Neo-Brutalist

| Shared Component | Key Styling Differences from C1 |
|---|---|
| Button | Thicker borders (var(--bw)), shadows on hover/active, no tertiary → tertiary uses dashed border |
| Input | Thicker borders, focus shifts background to accent color, error tints background |
| Checkbox | Larger (22×22), checked shows ✕ not checkmark |
| Toggle | Larger (56×28), thicker border, shadow |
| Slider | Larger thumb (24×24) with border and shadow |
| Card | Thick border + shadow, accent-bg eyebrow, bold typography |
| Badge | Full background color per variant, thicker border |
| Tag | Accent background + border |
| Table | Dark header row with light text, alternated row background |
| Alert | Icon box with variant background, border + shadow-sm |
| Modal | Shadow-lg offset |
| Progress | 16px height, bordered |
| Tabs | Button-like with border and accent active bg |
| All surfaces | border: var(--bw) solid var(--text) + box-shadow: var(--shadow) |
| Section head | Black bg block with shadow and -0.5deg rotation |

## Catalogue 3 — Glassmorphic Spatial

| Shared Component | Key Styling Differences from C1 |
|---|---|
| All surfaces | `background: var(--glass-1)` + `backdrop-filter: blur(28px)` + `border-radius: var(--r-4)` |
| Button: primary | Gradient bg + glow shadow |
| Button: ghost | Transparent + hairline border (replaces tertiary) |
| Button: glow | Gradient border outline via ::before pseudo |
| Input | Glass-2 bg + backdrop-filter, focus halo with glow shadow |
| Checkbox | Rounded (6px), gradient fill on checked |
| Toggle | Pill-shaped (999px radius), gradient fill, 44×26 |
| Slider | Glass track, white round thumb with shadow |
| Card | Glass bg + ::before highlight gradient overlay |
| Card-feature | Aurora gradient overlay on glass |
| Badge | Pill-shaped (999px radius) with dot indicator, tinted bg |
| Tag | Pill-shaped, glow variant with accent bg |
| Avatar | Circular with conic-gradient bg, sm/md/lg sizes |
| Modal | Glass-3 bg, backdrop-blur scrim |
| Topbar | Floating pill capsule (not full-width bar) |
| Tabs | Pill segmented control layout |
| Pagination | Pill segmented control layout |
| BottomNav | Pill capsule, icon dots |
| Alert | Tinted glass background per variant |
| Toast | Pill-shaped glass capsule with icon |
| Progress | Gradient fill bar |
| Section head | Inline flex with meta + heading + lede paragraph |

### Extra components (C3 only)

| Component | Purpose |
|---|---|
| `spark-chart/` | SVG sparkline for stat cards |
| `signal-ring/` | Conic-gradient ring with percentage text |
| `now-playing/` | Music player card with album art, controls, progress |
| `chart/` | SVG area chart with gradient fills for dashboard |
| `session-card/` | Dashboard session card with tags and actions |
