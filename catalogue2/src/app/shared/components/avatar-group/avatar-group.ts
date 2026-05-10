import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-avatar-group',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-group.html',
  styleUrl: './avatar-group.scss',
})
export class AvatarGroupComponent {
  @Input() avatars: string[] = [];
  @Input() max = 3;

  protected get visibleAvatars(): string[] {
    return this.avatars.slice(0, this.max);
  }

  protected get overflowCount(): number {
    return Math.max(0, this.avatars.length - this.max);
  }
}
