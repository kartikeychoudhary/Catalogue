import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { NavbarLink } from '@shared/components/navbar/navbar';
import type { SidebarSection } from '@shared/components/sidebar/sidebar';
import type { TabItem } from '@shared/components/tabs/tabs';
import type { BreadcrumbItem } from '@shared/components/breadcrumbs/breadcrumbs';
import type { BottomNavItem } from '@shared/components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-navigation-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navigation-section.component.html',
  styleUrl: './navigation-section.component.scss',
})
export class NavigationSectionComponent {
  readonly navbarLinks: NavbarLink[] = [
    { label: 'Work', href: '#work', active: true },
    { label: 'About', href: '#about' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  readonly sidebarSections: SidebarSection[] = [
    {
      heading: 'Catalogue',
      items: [
        { label: 'Identity', active: true },
        { label: 'Color' },
        { label: 'Typography', count: 4 },
        { label: 'Components' },
      ],
    },
    {
      heading: 'Resources',
      items: [
        { label: 'Tokens' },
        { label: 'Icons', count: 12 },
        { label: 'Changelog' },
      ],
    },
  ];

  readonly tabs: TabItem[] = [
    { label: 'Overview', active: true },
    { label: 'Usage' },
    { label: 'Specs' },
    { label: 'Changelog' },
  ];

  readonly crumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Button', href: '#' },
  ];

  readonly bottomNavItems: BottomNavItem[] = [
    { label: 'Home', active: true },
    { label: 'Browse' },
    { label: 'Favorites' },
    { label: 'Profile' },
  ];
}
