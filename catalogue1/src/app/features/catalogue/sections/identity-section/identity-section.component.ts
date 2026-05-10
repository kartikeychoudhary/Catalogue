import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-identity-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './identity-section.component.html',
  styleUrl: './identity-section.component.scss',
})
export class IdentitySectionComponent {}
