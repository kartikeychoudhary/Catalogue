import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cards-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cards-section.component.html',
  styleUrl: './cards-section.component.scss',
})
export class CardsSectionComponent {}
