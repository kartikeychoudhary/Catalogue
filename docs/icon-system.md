# Icon System

## Architecture

Single `<app-icon>` component backed by one inline SVG sprite.

### Why sprite over per-icon components?
- Single HTTP request for all icons
- Inline sprite avoids CORS issues with `currentColor`/`stroke`
- Browser caches the sprite; icons render as `<use href="#icon-{name}">`

## sprite.svg Format

```svg
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-check" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </symbol>
</svg>
```

All icons use `stroke="currentColor"` so they inherit text color. No hardcoded fill colors.

## IconRegistryService

```typescript
@Injectable({ providedIn: 'root' })
class IconRegistryService {
  private readonly spritePath = 'icons/sprite.svg';
  private loaded = false;

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

Sprite loaded via `APP_INITIALIZER` in CoreModule.

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
})
class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size: IconSize = 'md';
  @Input() ariaLabel?: string;
}
```

Size map: xs=12, sm=16, md=20, lg=24, xl=32. Numeric sizes also supported.
