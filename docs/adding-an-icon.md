# Adding an Icon

## 1. Add symbol to sprite.svg

Open `public/icons/sprite.svg` and add a `<symbol>`:

```svg
<symbol id="icon-download" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="7 10 12 15 17 10"/>
  <line x1="12" y1="15" x2="12" y2="3"/>
</symbol>
```

Rules:
- Use `stroke="currentColor"` (not hardcoded fills)
- Use `viewBox="0 0 24 24"` for consistency
- Icons should be drawn on a 24×24 grid

## 2. Add to IconName union

```typescript
// shared/components/icon/icon.types.ts
export type IconName =
  | 'check'
  | 'close'
  | 'download'  // ← added
  | 'search'
  // ...
```

## 3. Use anywhere

```html
<app-icon name="download" size="lg" ariaLabel="Download file"></app-icon>
```
