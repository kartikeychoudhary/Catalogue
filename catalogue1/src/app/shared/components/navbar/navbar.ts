import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface NavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  @Input() brand = '';
  @Input() links: NavbarLink[] = [];
  @Input() ctaLabel?: string;

  @Output() linkClicked = new EventEmitter<string>();
  @Output() ctaClicked = new EventEmitter<void>();
}
