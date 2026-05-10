# Adding a Component

Step-by-step recipe using `ButtonComponent` as example.

## 1. Generate the component

```bash
cd catalogue1
ng g c shared/components/button
```

The `angular.json` schematics enforce `standalone: false` and `changeDetection: OnPush` automatically.

## 2. Define typed Input/Output API

```typescript
// button.types.ts
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

// button.component.ts
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

  @Output() clicked = new EventEmitter<MouseEvent>();
}
```

## 3. Add SCSS using only var(--token)

```scss
// button.component.scss
.btn {
  background: var(--accent);
  color: var(--accent-fg);
  font-family: var(--sans);
  padding: var(--s-3) var(--s-4);
  border-radius: var(--radius);
}
```

Never: `color: #d6231a;` or `font-size: 14px;`

## 4. Add to SharedModule

```typescript
// shared.module.ts
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class SharedModule {}
```

## 5. Add to barrel

```typescript
// shared/components/index.ts
export { ButtonComponent } from './button/button.component';
export type { ButtonVariant, ButtonSize } from './button/button.types';
```

## 6. Write spec

```typescript
describe('ButtonComponent', () => {
  it('renders with variant class', () => { ... });
  it('emits clicked on button click', () => { ... });
  it('disables when loading', () => { ... });
  it('uses correct aria-label', () => { ... });
});
```

## 7. Add usage example in catalogue feature

```html
<!-- features/catalogue/sections/buttons-section/buttons-section.component.html -->
<app-button variant="primary" size="md">Subscribe</app-button>
<app-button variant="secondary" [disabled]="true">Disabled</app-button>
```
