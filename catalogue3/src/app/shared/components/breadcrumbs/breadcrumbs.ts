import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nav class="crumb">
    <ng-container *ngFor="let item of items; let last = last">
      <a *ngIf="item.href" [href]="item.href">{{ item.label }}</a>
      <span *ngIf="!item.href" style="color:var(--ink);">{{ item.label }}</span>
      <span class="sep" *ngIf="!last">›</span>
    </ng-container>
  </nav>`,
  styles: `
    .crumb { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-mute); margin-bottom: 14px; }
    .crumb a { text-decoration: none; padding: 4px 8px; border-radius: 8px; }
    .crumb a:hover { background: var(--glass-2); color: var(--ink); }
    .crumb .sep { color: var(--ink-faint); }
  `,
})
export class BreadcrumbsComponent {
  @Input() items: BreadcrumbItem[] = [];
}
