import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forms-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forms-section.component.html',
  styleUrl: './forms-section.component.scss',
})
export class FormsSectionComponent {}
