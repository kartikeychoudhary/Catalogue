import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class BreadcrumbsComponent {
  @Input() crumbs: BreadcrumbItem[] = [];
}
