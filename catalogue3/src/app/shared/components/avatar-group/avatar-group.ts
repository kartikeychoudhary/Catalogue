import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-group',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="avatar-group"><ng-content></ng-content></div>`,
  styles: ``,
})
export class AvatarGroupComponent {
  @Input() class = '';
}
