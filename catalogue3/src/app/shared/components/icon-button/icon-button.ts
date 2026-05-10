import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<button class="icon-btn" [attr.aria-label]="label" (click)="clicked.emit()">
    <ng-content></ng-content>
  </button>`,
  styles: `
    .icon-btn {
      width: 36px; height: 36px; border-radius: 999px; border: 1px solid var(--hairline);
      background: var(--glass-2); color: var(--ink); cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 14px;
    }
  `,
})
export class IconButtonComponent {
  @Input() label = 'Button';
  @Output() clicked = new EventEmitter<void>();
}
