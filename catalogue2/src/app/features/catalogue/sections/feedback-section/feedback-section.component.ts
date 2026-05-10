import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-feedback-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-section.component.html',
  styleUrl: './feedback-section.component.scss',
})
export class FeedbackSectionComponent {}
