import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-forms-section',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forms-section.component.html',
  styleUrl: './forms-section.component.scss',
})
export class FormsSectionComponent {
  readonly countryOptions = [
    { label: 'Switzerland', value: 'ch' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Italy', value: 'it' },
  ];

  readonly sortOptions = [
    { label: 'Newest first', value: 'newest' },
    { label: 'Oldest first', value: 'oldest' },
  ];

  readonly layoutOptions = [
    { label: 'Grid', value: 'grid' },
    { label: 'List', value: 'list' },
    { label: 'Compact', value: 'compact' },
  ];
}
