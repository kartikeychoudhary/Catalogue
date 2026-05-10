import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import type { IconName, IconSize } from './icon.types';

@Component({
  selector: 'app-icon',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg class="app-icon" [class]="'app-icon--' + size" aria-hidden="true">
    <use [attr.href]="'icons/sprite.svg#icon-' + name"></use>
  </svg>`,
  styles: `
    :host { display: inline-flex; align-items: center; justify-content: center; }
    .app-icon { width: var(--icon-size, 24px); height: var(--icon-size, 24px); fill: currentColor; }
    .app-icon--sm { --icon-size: 16px; }
    .app-icon--md { --icon-size: 24px; }
    .app-icon--lg { --icon-size: 32px; }
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
  @Input() size: IconSize = 'md';
}
