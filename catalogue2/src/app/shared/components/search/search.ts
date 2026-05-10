import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent {
  @Input() placeholder = 'Search';
}
