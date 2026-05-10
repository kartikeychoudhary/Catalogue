import { Component, ChangeDetectionStrategy } from '@angular/core';
import type { NavbarLink } from '@shared/components/navbar/navbar';
import type { SidebarSection } from '@shared/components/sidebar/sidebar';
import type { TabItem } from '@shared/components/tabs/tabs';
import type { BreadcrumbItem } from '@shared/components/breadcrumbs/breadcrumbs';
import type { BottomNavItem } from '@shared/components/bottom-nav/bottom-nav';
import type { ColumnDef } from '@shared/components/table/table';
import type { KeyValueItem } from '@shared/components/key-value/key-value';

@Component({
  selector: 'app-catalogue-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalogue-page.html',
  styleUrl: './catalogue-page.scss',
})
export class CataloguePageComponent {
  navLinks: NavbarLink[] = [
    { label: 'Today', href: '#', active: true },
    { label: 'Library', href: '#' },
    { label: 'Sessions', href: '#' },
    { label: 'Hardware', href: '#' },
  ];

  sidebarSections: SidebarSection[] = [
    {
      heading: 'LIBRARY',
      items: [
        { label: "Today's sessions", active: true, badge: '3' },
        { label: 'My presets', badge: '12' },
        { label: 'Sound library', badge: '240' },
        { label: 'Sleep sounds', badge: '42' },
      ],
    },
    {
      heading: 'HARDWARE',
      items: [{ label: 'Aurora Lamp' }, { label: 'HRV Watch' }],
    },
  ];

  tabItems: TabItem[] = [
    { label: 'Overview', active: true },
    { label: 'Sounds' },
    { label: 'Telemetry' },
    { label: 'Notes' },
  ];

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Library', href: '#' },
    { label: 'Today', href: '#' },
    { label: 'Slow Tide' },
  ];

  bottomNavItems: BottomNavItem[] = [
    { label: 'Today', active: true },
    { label: 'Library' },
    { label: 'Sounds' },
    { label: 'Me' },
  ];

  tableColumns: ColumnDef[] = [
    { key: 'session', label: 'Session ↓' },
    { key: 'sound', label: 'Sound' },
    { key: 'status', label: 'Status' },
    { key: 'minutes', label: 'Minutes', numeric: true },
    { key: 'updated', label: 'Updated' },
  ];

  tableData: Record<string, string | number>[] = [
    { session: 'Friday Quiet Hour', sound: 'Slow Tide', status: 'Live', minutes: 312, updated: '2 min ago' },
    { session: 'Studio Wind-down', sound: 'Pinewood', status: 'Drafting', minutes: 128, updated: '14:02' },
    { session: 'Sleep · Tier 2', sound: 'Reef cave', status: 'Reviewing', minutes: 540, updated: 'Yesterday' },
    { session: 'Morning Reset', sound: 'Birdsong, low', status: 'Idle', minutes: 86, updated: '2 days' },
    { session: 'Old draft · v1', sound: '—', status: 'Archived', minutes: '—', updated: 'Last month' },
  ];

  kvItems: KeyValueItem[] = [
    { key: 'Release', value: '14 June 2026' },
    { key: 'Format', value: 'Lamp + 12-month membership' },
    { key: 'First batch', value: '500 units · ships from BE' },
    { key: 'Latency', value: '14ms · audio & light synced' },
  ];
}
