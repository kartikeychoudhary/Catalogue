import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-avatar',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="avatar" [class.lg]="size === 'lg'" [class.sm]="size === 'sm'" [style.background]="bg">
    {{ initials }}
  </div>`,
  styles: `
    .avatar {
      width: 56px; height: 56px; border-radius: 50%;
      background: conic-gradient(from 200deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-1));
      display: grid; place-items: center; color: white; font-weight: 600; font-size: 18px; letter-spacing: -0.02em;
      border: 1px solid var(--hairline-bold);
    }
    .avatar.lg { width: 72px; height: 72px; font-size: 22px; }
    .avatar.sm { width: 36px; height: 36px; font-size: 13px; }
  `,
})
export class AvatarComponent {
  @Input() size: AvatarSize = 'md';
  @Input() initials = 'A';
  @Input() bg?: string;
}
