import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-profile',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-profile.html',
  styleUrl: './card-profile.scss',
})
export class CardProfileComponent {
  @Input() avatarInitials = '';
  @Input() name = '';
  @Input() role = '';
  @Input() bio = '';
  @Input() metaLabel = '';
  @Input() metaValue = '';
}
