import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {}
