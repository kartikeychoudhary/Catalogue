import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-patterns-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patterns-section.component.html',
  styleUrl: './patterns-section.component.scss',
})
export class PatternsSectionComponent {}
