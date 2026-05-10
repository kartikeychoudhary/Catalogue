import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-buttons-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './buttons-section.component.html',
  styleUrl: './buttons-section.component.scss',
})
export class ButtonsSectionComponent {}
