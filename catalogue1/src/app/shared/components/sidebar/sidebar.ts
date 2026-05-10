import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface SidebarSectionItem {
  label: string;
  count?: number;
  active?: boolean;
}

export interface SidebarSection {
  heading: string;
  items: SidebarSectionItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  @Input() sections: SidebarSection[] = [];
}
