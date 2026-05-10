import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface NavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nav class="fake-nav">
    <ng-content select="[nav-brand]"></ng-content>
    <div class="nav-links">
      <a *ngFor="let link of links" [href]="link.href" [class.-active]="link.active"
        (click)="$event.preventDefault(); linkClicked.emit(link)">
        {{ link.label }}
      </a>
    </div>
    <ng-content select="[nav-actions]"></ng-content>
  </nav>`,
  styles: `
    .fake-nav {
      display: flex; align-items: center; gap: 14px; padding: 10px 14px;
      border: 1px solid var(--hairline-bold); border-radius: 999px; background: var(--glass-2);
    }
    .nav-links { display: flex; gap: 4px; margin-left: auto; }
    .nav-links a { padding: 6px 12px; border-radius: 999px; text-decoration: none; color: var(--ink-soft); font-size: 13px; }
    .nav-links a.-active { background: var(--glass-strong); color: var(--ink); }
  `,
})
export class NavbarComponent {
  @Input() links: NavbarLink[] = [];
  @Output() linkClicked = new EventEmitter<NavbarLink>();
}
