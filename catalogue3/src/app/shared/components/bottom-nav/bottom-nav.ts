import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface BottomNavItem {
  label: string;
  active?: boolean;
  href?: string;
}

@Component({
  selector: 'app-bottom-nav',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nav class="mob-nav">
    <button *ngFor="let item of items" [class.-active]="item.active">
      <div class="ico"></div>{{ item.label }}
    </button>
  </nav>`,
  styles: `
    .mob-nav {
      display: flex; padding: 6px; border: 1px solid var(--hairline-bold); border-radius: 999px; background: var(--glass-2); width: fit-content; margin: 0 auto;
    }
    .mob-nav button { display: inline-flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 16px; border: 0; background: transparent; color: var(--ink-mute); font-size: 11px; cursor: pointer; border-radius: 999px; min-width: 64px; }
    .mob-nav button .ico { width: 18px; height: 18px; border-radius: 6px; background: currentColor; opacity: 0.4; }
    .mob-nav button.-active { background: var(--glass-strong); color: var(--ink); }
    .mob-nav button.-active .ico { background: var(--accent); opacity: 1; }
  `,
})
export class BottomNavComponent {
  @Input() items: BottomNavItem[] = [];
}
