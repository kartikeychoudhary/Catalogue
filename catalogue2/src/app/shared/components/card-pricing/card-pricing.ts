import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-pricing',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-pricing.html',
  styleUrl: './card-pricing.scss',
})
export class CardPricingComponent {
  @Input() price = '';
  @Input() period = '';
  @Input() description = '';
  @Input() features: string[] = [];
  @Input() ctaLabel = '';

  @Output() ctaClicked = new EventEmitter<void>();
}
