import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { SidebarSection } from '@shared/components/sidebar/sidebar';

@Component({
  selector: 'app-navigation-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.scss',
})
export class NavigationSectionComponent {
  sidebarSections: SidebarSection[] = [
    {
      heading: '// LIBRARY',
      items: [
        { label: 'Releases', count: 14, active: true },
        { label: 'Live tapes', count: 22 },
        { label: 'Demos', count: 8 },
        { label: 'Press', count: 4 },
      ],
    },
    {
      heading: '// SHOP',
      items: [
        { label: 'Vinyl' },
        { label: 'Tapes' },
        { label: 'Merch' },
      ],
    },
  ];
}
