import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface SidebarSection {
  heading: string;
  items: SidebarSectionItem[];
}

export interface SidebarSectionItem {
  label: string;
  active?: boolean;
  badge?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<aside class="shell-side">
    <ng-container *ngFor="let section of sections">
      <h6>{{ section.heading }}</h6>
      <ul>
        <li *ngFor="let item of section.items" [class.-active]="item.active">
          {{ item.label }}
          <span class="badge-mini" *ngIf="item.badge">{{ item.badge }}</span>
        </li>
      </ul>
    </ng-container>
    <ng-content></ng-content>
  </aside>`,
  styles: `
    .shell-side {
      padding: 18px; border-radius: var(--r-4); border: 1px solid var(--hairline); background: var(--glass-1);
    }
    .shell-side h6 { margin-bottom: 8px; }
    .shell-side ul { list-style: none; padding: 0; margin: 0 0 14px; display: flex; flex-direction: column; gap: 2px; }
    .shell-side li { padding: 8px 12px; border-radius: 10px; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 10px; color: var(--ink-soft); }
    .shell-side li:hover { background: var(--glass-2); color: var(--ink); }
    .shell-side li.-active { background: var(--glass-strong); color: var(--ink); }
    .shell-side li .badge-mini { margin-left: auto; font-family: var(--mono); font-size: 11px; color: var(--ink-mute); }
  `,
})
export class SidebarComponent {
  @Input() sections: SidebarSection[] = [];
}
