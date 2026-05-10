import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-colors-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './colors-section.component.html',
  styleUrl: './colors-section.component.scss',
})
export class ColorsSectionComponent {}
