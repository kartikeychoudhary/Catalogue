import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-feature',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-feature.html',
  styleUrl: './card-feature.scss',
})
export class CardFeatureComponent {}
